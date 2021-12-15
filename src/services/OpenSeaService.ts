import { BaseService } from './BaseService';

export class OpenSeaService extends BaseService {

    private baseUrl = "https://api.opensea.io/api/v1";
    
    public async retrieveAssets(limit = 20, offset = 0, order_direction = "desc"): Promise<AssetsResult | undefined> {
        return await this.get(`${this.baseUrl}/assets?order_direction=${order_direction}&offset=${offset}&limit=${limit}`);
    }

    public async retrieveOwnerAssets(address: string, limit = 20, offset = 0): Promise<AssetsResult | undefined> {
        return await this.get(`${this.baseUrl}/assets?owner=${address}&limit=${limit}&offset=${offset}`);
    }
}

interface AssetsResult {
    assets: Asset[];
}

export interface Asset {
    id: number;
    token_id: string;
    image_url: string;
    name: string;
    permalink: string;
}