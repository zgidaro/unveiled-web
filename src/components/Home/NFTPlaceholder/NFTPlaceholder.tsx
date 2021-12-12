import React from 'react';
import { Label, Link } from '@fluentui/react';
import { OpenSea } from '../../Icons/OpenSea';
import Tilt from 'react-parallax-tilt';

import './NFTPlaceholder.scss';

interface NFTPlaceHolderProps {
    name: string;
    image: string;
    href?: string;
}

const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

export const NFTPlaceholder = ({ name, image, href }: NFTPlaceHolderProps) => {
    return (
        <Tilt tiltEnable={!isTouchDevice}>
            <div className="nft-placeholder">
                {href ? <Link className="opensea" href={href} target="_blank"><OpenSea size={32} /></Link> : null}
                <img src={image} alt={name} />
                <Label>{name}</Label>
            </div>
        </Tilt>
    );
};