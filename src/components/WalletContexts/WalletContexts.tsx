import React from 'react';
import { Dashboard } from '../Dashboard/Dashboard';
import { EthereumWallet } from '../EthereumWallet/EthereumWallet';
import { SolanaWallet } from '../SolanaWallet/SolanaWallet';

export const WalletContexts = () => {
    return (
        <EthereumWallet>
            <SolanaWallet>
                <Dashboard />
            </SolanaWallet>
        </EthereumWallet>
    );
};
