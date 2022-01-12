import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useSolanaNFTWallet } from '../Dashboard/hooks';
import { UserService } from '../../services/UserService';
import { NFTMetadata } from '../Dashboard/types';

export const useProfile = () => {
    const [nfts, setNfts] = useState<NFTMetadata[]>([]);
    const [loading, setLoading] = useState(false);
    const [pageTitle, setPageTitle] = useState("");
    const { username } = useParams();
    const { getNftTokenData } = useSolanaNFTWallet();

    const loadUserWallet = useCallback(async (username: string) => {
        setLoading(true);
        const wallets = await new UserService().getUserWallets(username);
        let nfts: NFTMetadata[] = [];
        for (let wallet of wallets ?? []) {
            nfts.push(...await getNftTokenData(wallet.address));
        }
        setNfts(nfts);
        setLoading(false);
    }, [getNftTokenData]);

    useEffect(() => {
        if (!username) return;

        loadUserWallet(username);
    }, [username, loadUserWallet]);

    useEffect(() => {
        if (!username) return;

        const apostropheS = username[username.length - 1] === 's' || username[username.length - 1] === 'S' ? "'" : "'s";
        setPageTitle(`${username}${apostropheS} NFTs`);
        document.title = `Unveiled ∙ ${username}`;
    }, [username]);

    return {
        pageTitle, nfts, loading
    };
};