import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import React from 'react';
import { SolanaWalletContext } from './SolanaWallet.types';
import { useSolanaWallet } from './SolanaWallet.hooks';

require('@solana/wallet-adapter-react-ui/styles.css');

export const SolanaWallet: React.FC = ({ children }) => {
    const { endpoint, wallets } = useSolanaWallet();

    return (
        <SolanaWalletContext.Provider value={{}}>
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect={true}>
                    <WalletModalProvider>
                        {children}
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </SolanaWalletContext.Provider>
    );
};
