import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";

const network = WalletAdapterNetwork.Mainnet;
export const useSolanaProvider = () => {
    const endpoint = useMemo(() => clusterApiUrl(network), []);

    return {
        endpoint
    };
};