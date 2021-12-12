import React from 'react';
import { Dashboard } from '../Dashboard/Dashboard';
import { SolanaWallet } from '../SolanaWallet/SolanaWallet';

export const WalletContexts = () => {
    return (
        <SolanaWallet>
            <Dashboard />
        </SolanaWallet>
    );
};
