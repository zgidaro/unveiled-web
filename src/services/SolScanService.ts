import { BaseService } from "./BaseService";

export class SolScanService extends BaseService {
    private baseUrl = "https://api.solscan.io";

    public async getAccountByAddress(address: string): Promise<any> {
        return await this.get(`${this.baseUrl}/account?address=${address}`);
    }
}