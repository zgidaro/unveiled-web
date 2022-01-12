import { getLedgerWallet, getPhantomWallet, getSlopeWallet, getSolflareWallet } from "@solana/wallet-adapter-wallets";
import { createContext } from "react";

interface SolanaWalletContextProps {
    
}

const defaultValue: SolanaWalletContextProps = {
    
};

export const SolanaWalletContext = createContext(defaultValue);

export const solanaWallets = [
    getPhantomWallet(),
    getSlopeWallet(),
    getLedgerWallet(),
    getSolflareWallet(),
];