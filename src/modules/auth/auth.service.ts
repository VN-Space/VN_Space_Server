import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BaseController } from "../../common";
import { AuthRepository } from "./auth.repository";
import { ICreateAccessToken, TOKEN_TYPE } from "./auth.interface";
import { jwtSecret } from "../../configs";
import AuthModel from "./auth.model";

export class AuthService extends BaseController {
    private readonly authRepository: AuthRepository
    
    constructor() {
        super();
        this.authRepository = new AuthRepository()
    }
    
    private async generateAccessToken({userId, email}: ICreateAccessToken): Promise<string> {
        return jwt.sign({user: {id: userId, email}}, jwtSecret, {
            algorithm: 'HS256',
            expiresIn: 60 * 60, // 1 hour
        })
    }
    
    private async generateRefreshToken({userId, email}: ICreateAccessToken): Promise<string> {
        return jwt.sign({user: {id: userId, email}}, jwtSecret, {
            algorithm: 'HS256',
            expiresIn: 60 * 60 * 24 * 30, // 1 month
        })
    }
    
    private async verifyAccessToken(token: string) {
        const decoded = await jwt.verify(token, jwtSecret, {algorithms: ['HS256']});
        console.log(decoded)
        if (typeof decoded !== 'string' && decoded.user) {
            return {userId: decoded.user.id, email: decoded.user.email}
        }
        return false
    }
    
    private async verifyRefreshToken(token: string) {
        const decoded = await jwt.verify(token, jwtSecret, {algorithms: ['HS256']});
        if (typeof decoded !== 'string' && decoded.user) {
            return {userId: decoded.user.id, email: decoded.user.email}
        }
        return false
    }
    
    public async verifyToken(token: string, type: TOKEN_TYPE) {
        switch (type) {
            case TOKEN_TYPE.ACCESS_TOKEN:
                return this.verifyAccessToken(token)
            case TOKEN_TYPE.REFRESH_TOKEN:
                return this.verifyRefreshToken(token)
            default:
                return false
        }
    }
    
    public async isExistedRefreshToken(token: string) {
        return AuthModel.findOne({refreshToken: token})
    }
    
    public async comparePassword(importPassword: string, hashPassword: string): Promise<boolean> {
        return await bcrypt.compare(importPassword, hashPassword)
    }
    
    public async createLogin(importData: ICreateAccessToken): Promise<{ accessToken: string, refreshToken: string }> {
        const {userId} = importData
        const accessToken = await this.generateAccessToken(importData)
        const refreshToken = await this.generateRefreshToken(importData)
        const data = {userId, refreshToken}
        await this.authRepository.createToken(data) // add refresh token to db
        return {accessToken, refreshToken}
    }
}