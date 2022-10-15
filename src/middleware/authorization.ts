import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { BaseController } from "../common";
import { jwtSecret } from "../configs";
import UnauthorizedException from "../common/errors/UnauthorizedException";
import { AUTH_ERROR_CODE, AUTH_ERROR_MESSAGE, AuthService, TOKEN_TYPE } from "../modules";

export class Authorization extends BaseController {
    private readonly authService: AuthService
    
    constructor() {
        super();
        this.authService = new AuthService()
    }
    
    get isValidAccessToken() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
                    const token = req.headers.authorization.split(" ")[1]
                    if (!token) throw new UnauthorizedException(AUTH_ERROR_CODE.A_001, AUTH_ERROR_MESSAGE[AUTH_ERROR_CODE.A_001], req)
                    
                    const decoded = await this.authService.verifyToken(token, TOKEN_TYPE.ACCESS_TOKEN)
                    if(!decoded) throw new UnauthorizedException(AUTH_ERROR_CODE.A_001, AUTH_ERROR_MESSAGE[AUTH_ERROR_CODE.A_001], req)
                    req.loggedUser = decoded
                    return next()
                }
                throw new UnauthorizedException(AUTH_ERROR_CODE.A_001, AUTH_ERROR_MESSAGE[AUTH_ERROR_CODE.A_001], req)
            } catch (err) {
                next(err)
            }
        }
    }
}