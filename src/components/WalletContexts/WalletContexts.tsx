import React from 'react';
import { Dashboard } from '../Dashboard/Dashboard';
import { EthereumProvider } from '../EthereumProvider/EthereumProvider';
import { SolanaProvider } from '../SolanaProvider/SolanaProvider';

export const WalletContexts = () => {
    return (
        <EthereumProvider>
            <SolanaProvider>
                <Dashboard />
            </SolanaProvider>
        </EthereumProvider>
    );
};
