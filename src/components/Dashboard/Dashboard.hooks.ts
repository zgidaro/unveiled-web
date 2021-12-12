import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useState } from "react";
import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import { NFT, NFTMetadata } from './Dashboard.types';
import { BaseService } from '../../services/BaseService';
import { useDispatch, useSelector } from 'react-redux';
import { addWallet, loadWallets } from '../../redux/authentication.state';
import { UserService, WalletType } from "../../services/UserService";
import { walletsSelector } from '../../selectors/authentication.selector';
import { PublicKey } from "@solana/web3.js";

export const useDashboard = () => {
    const wallets = useSelector(walletsSelector);
    const dispatch = useDispatch();
    const [nfts, setNfts] = useState<NFTMetadata[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadWallets()(dispatch);
    }, [dispatch]);

    const { getNftTokenData } = useSolanaNFTWallet();

    const loadWalletNfts = useCallback(async () => {
        const result: NFTMetadata[] = [];
        for (let wallet of wallets) {
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
        nfts, loading
    };
};

const baseService = new BaseService();

export const useSolanaNFTWallet = () => {
    const { publicKey, disconnect } = useWallet();

    const dispatch = useDispatch();

    const addWalletAsync = useCallback(async (address: string, type: WalletType) => {
        const service = new UserService();
        await service.addWallet(address, type);
        dispatch(addWallet({ address: address, type: type }));
    }, [dispatch]);

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
        
        addWalletAsync(publicKey.toString(), "solana");
        disconnect();
    }, [publicKey, disconnect, addWalletAsync]);

    return {
        getNftTokenData
    };
};