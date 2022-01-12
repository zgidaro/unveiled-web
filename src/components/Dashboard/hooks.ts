import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useState } from "react";
import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import { NFT, NFTMetadata } from './types';
import { BaseService } from '../../services/BaseService';
import { useDispatch, useSelector } from 'react-redux';
import { addWallet, loadWallets, deleteWallet } from '../../redux/authentication.state';
import { walletsSelector } from '../../selectors/authentication.selector';
import { PublicKey } from "@solana/web3.js";
import { OpenSeaService } from '../../services/OpenSeaService';

const openSeaService = new OpenSeaService();
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

const baseService = new BaseService();

export const useSolanaNFTWallet = () => {
    const { publicKey, disconnect } = useWallet();

    const dispatch = useDispatch();

    const parseTokenAccountsByOwner = useCallback(async (address: string): Promise<NFT[]> => {
        const publicKey = new PublicKey(address);
        if (!publicKey) return [];

        const nfts = await getParsedNftAccountsByOwner({ publicAddress: publicKey });
        return nfts;
    }, []);

    const getNftTokenData = useCallback(async (address: string): Promise<NFTMetadata[]> => {
        try {
            const nftData = await parseTokenAccountsByOwner(address) as any;

            var data = Object.keys(nftData).map((key) => nftData[key]);
            let arr: NFTMetadata[] = [];
            let n = data.length;
            for (let i = 0; i < n; i++) {
                let val = await baseService.getWithoutHeaders<NFTMetadata>(data[i].data.uri);
                if (val) {
                    arr.push(val);
                }
            }
            return arr;
        } catch (error) {
            return [];
        }
    }, [parseTokenAccountsByOwner]);
    
    useEffect(() => {
        if (!publicKey) return;
        
        addWallet(publicKey.toString(), "solana")(dispatch);
        disconnect();
    }, [publicKey, disconnect, dispatch]);

    return {
        getNftTokenData
    };
};