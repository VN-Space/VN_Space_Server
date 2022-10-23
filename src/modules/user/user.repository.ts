import { IUser, IUserRegister } from "./user.interface";
import UserModel from "./user.model";
import { FilterQuery } from "mongoose";

export class UserRepository {
    constructor() {
    }
    
    public async findUserByEmailWithPassword(email: string): Promise<IUser | null> {
        return UserModel.findOne({email}).select('+password').exec()
    }
    
    public async findByEmail(email: string, select?: string): Promise<IUser | null> {
        return UserModel.findOne({email}).select(select).exec()
    }
    
    public async getListUserWithFilter(limit: number = 10, skip: number = 0, filter?: FilterQuery<IUser>) {
        return UserModel.find({...filter, isDeleted: false}).limit(limit).skip(skip).lean().select('-__v -isDeleted')
    }
    
    public async createUser(data: IUserRegister) {
        return UserModel.create(data)
    }
}