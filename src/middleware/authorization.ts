import { NextFunction, Request, Response } from 'express'
import { GraphQLError } from "graphql/error";
import crypto from "crypto";
import { ExpressContextFunctionArgument } from "@apollo/server/express4";

import { jwtSecret } from "../configs";
import { BaseController } from "../common";
import UnauthorizedException from "../common/errors/UnauthorizedException";
import { AUTH_ERROR_CODE, AUTH_ERROR_MESSAGE, AuthService, TOKEN_TYPE } from "../modules";


export class Authorization extends BaseController {
    private readonly authService: AuthService
    constructor() {
        super();
        this.authService = new AuthService()
    }
    
    private getToken(req: Request) {
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) throw new UnauthorizedException(AUTH_ERROR_CODE.A_001, AUTH_ERROR_MESSAGE[AUTH_ERROR_CODE.A_001], req)
        return req.headers.authorization.split(" ")[1]
    }
    
    get isValidAccessToken() {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const token = this.getToken(req)
                if (!token) throw new UnauthorizedException(AUTH_ERROR_CODE.A_001, AUTH_ERROR_MESSAGE[AUTH_ERROR_CODE.A_001], req)
                
                const decoded = this.authService.verifyToken(token, TOKEN_TYPE.ACCESS_TOKEN)
                if (!decoded) throw new UnauthorizedException(AUTH_ERROR_CODE.A_001, AUTH_ERROR_MESSAGE[AUTH_ERROR_CODE.A_001], req)
                req.loggedUser = decoded
                return next()
            } catch (err) {
                next(err)
            }
        }
    }
    
    get isValidRefreshToken() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                if (!req.loggedUser || !req.loggedUser.refreshKey) {
                    throw new UnauthorizedException(AUTH_ERROR_CODE.A_001, AUTH_ERROR_MESSAGE[AUTH_ERROR_CODE.A_001], req)
                }
                const {refreshKey} = req.loggedUser
                const salt = crypto.createSecretKey(
                    Buffer.from(refreshKey, 'base64')
                );
                const hash = crypto
                    .createHmac('sha512', salt)
                    .update(req.loggedUser.userId + jwtSecret)
                    .digest('base64');
                if (hash === req.body.refreshToken) {
                    req.body = {email: req.loggedUser.email, userId: req.loggedUser.userId}
                    return next();
                }
                throw new UnauthorizedException(AUTH_ERROR_CODE.A_001, AUTH_ERROR_MESSAGE[AUTH_ERROR_CODE.A_001], req)
            } catch (err) {
                next(err)
            }
        }
    }
    
    get isValidAccessTokenGraphql() {
        return async ({req}: ExpressContextFunctionArgument) => {
            const token = this.getToken(req)
            const decoded = this.authService.verifyToken(token, TOKEN_TYPE.ACCESS_TOKEN)
            if (!decoded) {
                throw new GraphQLError(AUTH_ERROR_MESSAGE[AUTH_ERROR_CODE.A_001], {
                    extensions: {
                        code: AUTH_ERROR_CODE.A_001,
                        http: {status: 401},
                    },
                })
            }
            return req.loggedUser = decoded
        }
    }
}