import { AuthenticationService } from "./AuthenticationService";
import { BaseService } from "./BaseService";

export class SecuredService extends BaseService {

    constructor() {
        super();
        const token = AuthenticationService.getToken() ?? "";
        this.headers["x-access-token"] = token;
    }
}