import { NFTPlaceHolderProps } from "./types";
import { NFT, NFTMetadata } from '../../Dashboard/types';
import { useCallback, useEffect, useState } from "react";
import { BaseService } from '../../../services/BaseService';

const baseService = new BaseService();

const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

export const useNFTPlaceholder = ({ nft, href, tiltEnable = !isTouchDevice }: NFTPlaceHolderProps) => {
    const [metadata, setMetadata] = useState<NFTMetadata>({ name: "", image: "", description: "" });

    const getParsedNft = useCallback(async (nft: NFT) => {
        const parsedNft = await baseService.getWithoutHeaders<NFTMetadata>(nft.data.uri);
        if (parsedNft) {
            setMetadata(parsedNft);
        }
    }, []);

    useEffect(() => {
        const isMetadata = !!(nft as NFTMetadata).name;
        if (isMetadata) {
            setMetadata(nft as NFTMetadata);
        }
        else {
            getParsedNft(nft as NFT);
        }
    }, [nft, getParsedNft]);

    return {
        name: metadata.name, href, image: metadata.image, tiltEnable
    };
};