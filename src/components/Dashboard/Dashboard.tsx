import React from 'react';
import { Shimmer, ShimmerElementsGroup, ShimmerElementType } from '@fluentui/react';
import { NFTPlaceholder } from '../Home/NFTPlaceholder/NFTPlaceholder';
import { useDashboard } from './Dashboard.hooks';

import './Dashboard.scss';

export const Dashboard = () => {
    const { nfts, loading } = useDashboard();

    return (
        <div className="dashboard">
            <h1 style={{ marginBottom: '16px' }}>Your profile</h1>
            <div className="dashboard-nfts">
                {loading
                    ? <Shimmer
                        width={350}
                        customElementsGroup={
                            <div style={{ display: 'flex' }}>
                                <ShimmerElementsGroup
                                    width={'350px'}
                                    shimmerElements={[
                                        { type: ShimmerElementType.line, width: 350, height: 350 },
                                    ]}
                                />
                            </div>
                        }
                    />
                    : nfts.map((nft, i) => <NFTPlaceholder key={`${nft.name}_${i}`} name={nft.name} image={nft.image} />)
                }
            </div>
        </div>
    );
};
