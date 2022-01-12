import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import React from 'react';
import { useSolanaProvider } from './hooks';
import { SolanaWalletContext, solanaWallets } from './types';

require('@solana/wallet-adapter-react-ui/styles.css');

export const SolanaProvider: React.FC = ({ children }) => {
    const { endpoint } = useSolanaProvider();

    return (
        <SolanaWalletContext.Provider value={{}}>
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={solanaWallets} autoConnect={true}>
                    <WalletModalProvider>
                        {children}
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </SolanaWalletContext.Provider>
    );
};
