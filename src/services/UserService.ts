import { SecuredService } from './SecuredService';

export class UserService extends SecuredService {
    private baseUrl = "api/users";

    public async addWallet(address: string, type: string): Promise<void> {
        return await this.put(`${this.baseUrl}/wallets`, { address, type });
    }

    public async getWallets(): Promise<Wallet[] | undefined> {
        return await this.get(`${this.baseUrl}/wallets`);
    }

    public async getUserWallets(username: string): Promise<Wallet[] | undefined> {
        return await this.get(`${this.baseUrl}/wallets/${username}`);
    }

    public async deleteWallet(address: string): Promise<void> {
        return await this.put(`${this.baseUrl}/wallets/${address}`);
    }
}

export type WalletType = 'solana' | 'ethereum' | 'polygon';

export interface Wallet {
    address: string;
    type: WalletType;
}