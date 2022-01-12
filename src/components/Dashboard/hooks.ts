import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { NFT, NFTMetadata, SplAccount } from './types';
import { BaseService } from '../../services/BaseService';
import { useDispatch, useSelector } from 'react-redux';
import { addWallet, loadWallets, deleteWallet } from '../../redux/authentication.state';
import { walletsSelector } from '../../selectors/authentication.selector';
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { OpenSeaService } from '../../services/OpenSeaService';
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { SolScanService } from '../../services/SolScanService';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

const openSeaService = new OpenSeaService();
const solScanService = new SolScanService();
const baseService = new BaseService();

const limit = 50;
export const useDashboard = () => {
    const wallets = useSelector(walletsSelector);
    const dispatch = useDispatch();
    const [nfts, setNfts] = useState<NFTMetadata[]>([]);
    const [loading, setLoading] = useState(false);
    const [walletDialog, showWalletDialog] = useState(false);

    const toggleWalletDialog = useCallback(() => {
        showWalletDialog(!walletDialog);
    }, [walletDialog]);

    const onDeleteWallet = useCallback((address: string) => {
        deleteWallet(address)(dispatch);
    }, [dispatch]);

    useEffect(() => {
        loadWallets()(dispatch);
    }, [dispatch]);

    const { getNftTokenData } = useSolanaNFTWallet();

    const loadWalletNfts = useCallback(async () => {
        const result: NFTMetadata[] = [];
        for (let wallet of wallets.filter((w) => w.type === "solana")) {
            result.push(...(await getNftTokenData(wallet.address)));
        }

        for (let wallet of wallets.filter((w) => w.type === "ethereum")) {
            let offset = 0;
            do {
                const res = (await openSeaService.retrieveOwnerAssets(wallet.address, limit, offset))?.assets ?? [];
                result.push(...res.filter((a) => a.image_url).map((a) => ({ name: a.name, image: a.image_url, description: a.name })));
                offset += limit;
            } while (offset < 100);
        }
        setNfts(result);
        setLoading(false);
    }, [wallets, getNftTokenData]);

    useEffect(() => {
        setLoading(true);
        loadWalletNfts();
    }, [loadWalletNfts]);

    return {
        wallets, nfts, loading, walletDialog, toggleWalletDialog, onDeleteWallet
    };
};

export const useSolanaNFTWallet = () => {
    const { publicKey, disconnect } = useWallet();

    const dispatch = useDispatch();

    const connection = useMemo(() => {
        return new Connection(clusterApiUrl(WalletAdapterNetwork.Mainnet), "confirmed");
    }, []);

    const getNftTokenData = useCallback(async (address: string): Promise<NFTMetadata[]> => {
        try {
            return await parseTokenAccountsByOwner(connection, address);
        }
        catch (error) {
            return [];
        }
    }, [connection]);

    useEffect(() => {
        if (!publicKey) return;

        addWallet(publicKey.toString(), "solana")(dispatch);
        disconnect();
    }, [publicKey, disconnect, dispatch]);

    return {
        getNftTokenData
    };
};

const parseTokenAccountsByOwner = async (connection: Connection, address: string): Promise<NFTMetadata[]> => {
    const publicKey = new PublicKey(address);
    if (!publicKey) return [];

    const { value: splAccounts } = await connection.getParsedTokenAccountsByOwner(publicKey, { programId: TOKEN_PROGRAM_ID });
    const splNfts = await getNftSplAccountsByAddress(splAccounts);

    const nfts = splNfts.map((nft) => nft.data.metadata as NFT);
    const parsedNfts = await Promise.all(nfts.map((nft) => baseService.getWithoutHeaders<NFTMetadata>(nft.data.uri)));
    return parsedNfts.filter((v) => !!v) as NFTMetadata[];
};

const getNftSplAccountsByAddress = async (accounts: SplAccount[]) => {
    const nftAccounts = accounts.filter(nftFilter);
    const nftAddresses = nftAccounts.map((nft) => nft.account.data.parsed?.info?.mint as string);
    return await Promise.all(nftAddresses.map((nft) => solScanService.getAccountByAddress(nft)));
};

const nftFilter = ({ account }: SplAccount) => {
    const tokenAmount = account.data.parsed?.info?.tokenAmount;
    const amount = tokenAmount.uiAmount;
    const decimals = tokenAmount.decimals;
    return decimals === 0 && amount >= 1;
};