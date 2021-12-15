import React from 'react';
import { Label, PrimaryButton, Shimmer, ShimmerElementsGroup, ShimmerElementType } from '@fluentui/react';
import { IconButton } from '@fluentui/react/lib/Button';
import { NFTPlaceholder } from '../Home/NFTPlaceholder/NFTPlaceholder';
import { useDashboard } from './Dashboard.hooks';
// import { Room } from '../../viewer/Room';
import { SelectWalletDialog } from '../SelectWalletDialog/SelectWalletDialog';
import SolanaLogo from '../Icons/SolanaLogo.svg';
import EthereumLogo from '../Icons/EthereumLogo.svg';

import './Dashboard.scss';

export const Dashboard = () => {
    const { wallets, nfts, loading, walletDialog, toggleWalletDialog, onDeleteWallet } = useDashboard();

    return (
        <>
            <div className="dashboard">
                <h1 style={{ marginBottom: '16px' }}>Your wallets</h1>
                <PrimaryButton onClick={toggleWalletDialog} text="Add Wallet" />
                <div className="dashboard-wallets">
                    {
                        wallets.map((w) => {
                            return (
                                <div key={w.address} className="dashboard-wallet">
                                    <img width={16} src={w.type === "solana" ? SolanaLogo : w.type === "ethereum" ? EthereumLogo : ""} alt={w.type} />
                                    <Label>{w.address}</Label>
                                    <IconButton color="red" iconProps={{ iconName: "Delete" }} onClick={() => onDeleteWallet(w.address)} />
                                </div>
                            );
                        })
                    }
                </div>
                <h1 style={{ marginBottom: '16px' }}>Your profile</h1>
                <div className="dashboard-nfts">
                    {loading
                        ? <Shimmer
                            customElementsGroup={
                                <div style={{ display: 'flex' }}>
                                    <ShimmerElementsGroup
                                        shimmerElements={[
                                            { type: ShimmerElementType.line, width: 300, height: 300 },
                                            { type: ShimmerElementType.gap, width: 16, height: 300 },
                                            { type: ShimmerElementType.line, width: 300, height: 300 },
                                            { type: ShimmerElementType.gap, width: 16, height: 300 },
                                            { type: ShimmerElementType.line, width: 300, height: 300 },
                                        ]}
                                    />
                                </div>
                            }
                        />
                        : nfts.map((nft, i) => <NFTPlaceholder key={`${nft.name}_${i}`} name={nft.name} image={nft.image} />)
                    }
                </div>
            </div>
            <SelectWalletDialog open={walletDialog} onClose={toggleWalletDialog} />
        </>
    );
};
