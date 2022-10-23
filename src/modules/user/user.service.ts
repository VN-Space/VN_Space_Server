import { BaseController } from "../../common";
import { IUser, IUserRegister } from "./user.interface";
import { UserRepository } from "./user.repository";
import { FilterQuery } from "mongoose";

export class UserService extends BaseController {
    private readonly userRepository: UserRepository
    constructor() {
        super();
        this.userRepository = new UserRepository()
    }
    
    public async findUserByEmailWithPassword(email: string): Promise<IUser | false> {
        const response = await this.userRepository.findUserByEmailWithPassword(email)
        return !response ? false : response
    }
    
    public async findByEmail(email: string): Promise<IUser | false> {
        const response = await this.userRepository.findByEmail(email)
        return !response ? false : response
    }
    
    public async getByEmail(email: string, selected?: string): Promise<IUser | false> {
        const response = await this.userRepository.findByEmail(email, selected)
        return !response ? false : response
    }
    
    public async createAccount(data: IUserRegister): Promise<IUser | false> {
        const response = await this.userRepository.createUser(data)
        return !response ? false : response
    }
    
    public async getListUserWithFilter(limit: number, skip: number, filter: any) {
        const response = await this.userRepository.getListUserWithFilter(limit, skip, filter)
        return !response ? false : response
    }
}