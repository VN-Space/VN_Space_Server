import AuthModel from "./auth.model";
import { IAuth } from "./auth.interface";

export class AuthRepository {
    constructor() {
    }
    
    public async createToken(data: IAuth) {
        return AuthModel.create(data)
    }
    
    public async checkTokenExist(token: string) {
        return AuthModel.findOne({token});
    }
}