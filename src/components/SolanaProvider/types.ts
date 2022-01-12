import { LedgerWalletAdapter, PhantomWalletAdapter, SlopeWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import { createContext } from "react";

interface SolanaWalletContextProps {
    
}

const defaultValue: SolanaWalletContextProps = {
    
};

export const SolanaWalletContext = createContext(defaultValue);

export const solanaWallets = [
    new PhantomWalletAdapter(),
    new SlopeWalletAdapter(),
    new SolflareWalletAdapter(),
    new LedgerWalletAdapter(),
];