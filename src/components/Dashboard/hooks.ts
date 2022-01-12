import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { NFT, SplAccount } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { addWallet, loadWallets, deleteWallet } from '../../redux/authentication.state';
import { walletsSelector } from '../../selectors/authentication.selector';
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { SolScanService } from '../../services/SolScanService';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

const solScanService = new SolScanService();

export const useDashboard = () => {
    const wallets = useSelector(walletsSelector);
    const dispatch = useDispatch();
    const [nfts, setNfts] = useState<NFT[]>([]);
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
        const result: NFT[] = [];
        for (let wallet of wallets.filter((w) => w.type === "solana")) {
            result.push(...(await getNftTokenData(wallet.address)));
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

    const getNftTokenData = useCallback(async (address: string): Promise<NFT[]> => {
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

const parseTokenAccountsByOwner = async (connection: Connection, address: string): Promise<NFT[]> => {
    const publicKey = new PublicKey(address);
    if (!publicKey) return [];

    const { value: splAccounts } = await connection.getParsedTokenAccountsByOwner(publicKey, { programId: TOKEN_PROGRAM_ID });
    const splNfts = await getNftSplAccountsByAddress(splAccounts);

    const nfts = splNfts.map((nft) => nft.data.metadata as NFT);
    return nfts;
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