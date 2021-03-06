import React from 'react';
import { Shimmer, ShimmerElementsGroup, ShimmerElementType } from '@fluentui/react';
import { NFTPlaceholder } from '../Home/NFTPlaceholder/NFTPlaceholder';
import { UnveiledLogo } from '../Icons/UnveiledLogo';
import { useProfile } from './hooks';

export const Profile = () => {
    const { pageTitle, nfts, loading } = useProfile();

    return (
        <div className="dashboard">
            <h1 style={{ marginBottom: '16px' }}>{pageTitle}</h1>
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
                    : nfts.map((nft, i) => <NFTPlaceholder key={`${nft.mint}}`} nft={nft} />)
                }
            </div>
            {nfts.length || loading ? null : <h3>This user does not have any NFTs yet.</h3>}
            <a href="/home" className="logo-footer">
                <UnveiledLogo size={16} fill="#8e8e8e" />
            </a>
        </div>
    );
};
