import React from 'react';
import { Label, Link } from '@fluentui/react';
import { OpenSea } from '../../Icons/OpenSea';
import Tilt from 'react-parallax-tilt';
import { NFTPlaceHolderProps } from './types';
import { useNFTPlaceholder } from './hooks';

import './NFTPlaceholder.scss';

export const NFTPlaceholder = (props: NFTPlaceHolderProps) => {
    const { name, image, href, tiltEnable } = useNFTPlaceholder(props);
    return (
        <Tilt tiltEnable={tiltEnable}>
            <div className="nft-placeholder">
                {href ? <Link className="opensea" href={href} target="_blank"><OpenSea size={32} /></Link> : null}
                <img src={image} alt={name} />
                <Label>{name}</Label>
            </div>
        </Tilt>
    );
};