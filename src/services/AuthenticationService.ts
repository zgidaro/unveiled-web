import { BaseService } from './BaseService';

export class AuthenticationService extends BaseService {
    private baseUrl = "api/users";

    public async login(username: string, password: string): Promise<string | undefined> {
        return await this.post(`${this.baseUrl}/login`, { username, password });
    }

    public async signup(email: string, username: string, password: string): Promise<string | undefined> {
        return await this.post(`${this.baseUrl}/signup`, { email, username, password });
    }

    private static token: string | undefined = localStorage.getItem('currentUser') ?? undefined;

    public static getToken(): string | undefined {
        return this.token;
    }

    public static saveToken(token: string) {
        this.token = token;
    }

    public static clearToken() {
        this.token = undefined;
    }
}