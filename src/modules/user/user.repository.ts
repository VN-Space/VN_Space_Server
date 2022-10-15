import { BaseController } from "../../common";
import { IUser, IUserRegister } from "./user.interface";
import UserModel from "./user.model";

export class UserRepository extends BaseController {
    constructor() {
        super()
    }
    
    public async findByEmail(email: string, select?: string): Promise<IUser | null> {
        return UserModel.findOne({email}).select(select)
    }
    
    public async createUser(data: IUserRegister) {
        return UserModel.create(data)
    }
    
    public validatePassword(currentPassword: string) {
        UserModel
    }
}