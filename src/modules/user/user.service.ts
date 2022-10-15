import { BaseController } from "../../common";
import { IUser, IUserRegister } from "./user.interface";
import { UserRepository } from "./user.repository";

export class UserService extends BaseController {
    private readonly userRepository: UserRepository
    
    constructor() {
        super();
        this.userRepository = new UserRepository()
    }
    
    public async findByEmail(email: string, selected?: string): Promise<IUser | false> {
        const response = await this.userRepository.findByEmail(email, selected)
        return !response ? false : response
    }
    
    public async createAccount(data: IUserRegister): Promise<IUser | false> {
        const response = await this.userRepository.createUser(data)
        return !response ? false : response
    }
}