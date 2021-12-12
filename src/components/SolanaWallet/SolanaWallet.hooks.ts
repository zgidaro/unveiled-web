import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { getLedgerWallet, getPhantomWallet, getSlopeWallet, getSolflareWallet, getSolletExtensionWallet, getSolletWallet } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";

const network = WalletAdapterNetwork.Mainnet;
export const useSolanaWallet = () => {
    const endpoint = useMemo(() => clusterApiUrl(network), []);

    const wallets = useMemo(() => [
        getPhantomWallet(),
        getSlopeWallet(),
        getSolflareWallet(),
        getLedgerWallet(),
        getSolletWallet({ network }),
        getSolletExtensionWallet({ network }),
    ], []);

    return {
        endpoint, wallets
    }
};