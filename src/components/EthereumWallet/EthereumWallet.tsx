import React from 'react';
import { EthereumWalletContext } from './EthereumWallet.types';
import { Web3ReactProvider } from '@web3-react/core';
import { provider } from "web3-core";
import Web3 from 'web3';

const getLibrary = (provider: provider) => new Web3(provider);

export const EthereumWallet: React.FC = ({ children }) => {
    return (
        <EthereumWalletContext.Provider value={{ }}>
            <Web3ReactProvider getLibrary={getLibrary}>
                {children}
            </Web3ReactProvider>
        </EthereumWalletContext.Provider>
    );
};
