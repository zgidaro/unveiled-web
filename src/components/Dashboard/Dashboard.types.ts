import { MetadataKey } from '@nfteyez/sol-rayz/dist/config/metaplex';

export interface NFT {
    mint: string;
    updateAuthority: string;
    data: {
        creators: any[];
        name: string;
        symbol: string;
        uri: string;
        sellerFeeBasisPoints: number;
    };
    key: MetadataKey;
    primarySaleHappened: boolean;
    isMutable: boolean;
    editionNonce: number;
    masterEdition?: string | undefined;
    edition?: string | undefined;
}

export interface NFTMetadata {
    name: string;
    image: string;
    description: string;
}