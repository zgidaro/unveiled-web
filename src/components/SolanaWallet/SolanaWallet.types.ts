import { createContext } from "react";

interface SolanaWalletContextProps {
    
}

const defaultValue: SolanaWalletContextProps = {
    
};

export const SolanaWalletContext = createContext(defaultValue);