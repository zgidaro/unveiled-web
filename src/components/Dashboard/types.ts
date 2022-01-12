import { AccountInfo, ParsedAccountData, PublicKey } from "@solana/web3.js";

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

export type SplAccount = {
    pubkey: PublicKey;
    account: AccountInfo<ParsedAccountData>;
}