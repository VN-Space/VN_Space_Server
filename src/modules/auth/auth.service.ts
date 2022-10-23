import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from 'crypto';

import { jwtSecret, logger } from "../../configs";
import { BaseController } from "../../common";
import { ICreateAccessToken, TOKEN_TYPE } from "./auth.interface";

export class AuthService extends BaseController {
    constructor() {
        super();
    }
    
    private verifyAccessToken(token: string): false | {userId: string, email: string, refreshKey: string} {
        try {
            const decoded = jwt.verify(token, jwtSecret, {algorithms: ['HS256'],});
            if (typeof decoded !== 'string' && decoded.user && decoded.refreshKey) {
                return {userId: decoded.user.id, email: decoded.user.email, refreshKey: decoded.refreshKey}
            }
            return false
        } catch (err) {
            logger.error(err ? err.toString() : 'Invalid token')
            return false
        }
        
    }
    
    public verifyToken(token: string, type: TOKEN_TYPE): false | {userId: string, email: string, refreshKey: string} {
        switch (type) {
            case TOKEN_TYPE.ACCESS_TOKEN:
                return this.verifyAccessToken(token)
            default:
                return false
        }
    }
    
    public async comparePassword(importPassword: string, hashPassword: string): Promise<boolean> {
        return await bcrypt.compare(importPassword, hashPassword)
    }
    
    public createJWT({userId, email}: ICreateAccessToken): false | { accessToken: string, refreshToken: string } {
        if (!userId || !email) return false
        const refreshId = userId + jwtSecret;
        const salt = crypto.createSecretKey(crypto.randomBytes(16));
        const hash = crypto
            .createHmac('sha512', salt)
            .update(refreshId)
            .digest('base64');
        const refreshKey = salt.export().toString('base64');
        const token = jwt.sign({user: {id: userId, email}, refreshKey}, jwtSecret, {
            algorithm: 'HS256',
            expiresIn: 60 * 60, // 1 hour
        })
        return {accessToken: token, refreshToken: hash}
    }
}