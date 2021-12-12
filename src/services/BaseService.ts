export class BaseService {

    protected headers: { [key: string]: string } = {
        "Content-Type": "application/json",
    };

    public async get<T>(url: string): Promise<T | undefined> {
        return await this.wrap(fetch(url, { method: "GET", headers: this.headers }));
    }

    public async getWithoutHeaders<T>(url: string): Promise<T | undefined> {
        return await this.wrap(fetch(url));
    }

    public async post<T>(url: string, body?: any): Promise<T | undefined> {
        return await this.wrap(fetch(url, { method: "POST", body: JSON.stringify(body), headers: this.headers }));
    }

    public async put<T>(url: string, body?: any): Promise<T | undefined> {
        return await this.wrap(fetch(url, { method: "PUT", body: JSON.stringify(body), headers: this.headers }));
    }

    private async wrap<T>(call: Promise<Response>): Promise<T | undefined> {
        try {
            const result = await call;
            return result.json();
        }
        catch (_) {
            return undefined;
        }
    }
}