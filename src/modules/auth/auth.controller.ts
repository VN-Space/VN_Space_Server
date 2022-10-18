import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";

import { BadRequestException, BaseController, BaseResponse } from "../../common";
import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";
import { AUTH_ERROR_CODE, AUTH_ERROR_MESSAGE } from "./auth.message";

export class AuthController extends BaseController {
    private readonly authService: AuthService
    private readonly userService: UserService
    constructor() {
        super();
        this.authService = new AuthService()
        this.userService = new UserService()
    }
    
    public async login(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body
            const checkExistEmail = await this.userService.findByEmail(email)
            if (!checkExistEmail) throw new BadRequestException(AUTH_ERROR_CODE.A_002, AUTH_ERROR_MESSAGE[AUTH_ERROR_CODE.A_002])
            
            const comparePassword = await this.authService.comparePassword(password, checkExistEmail.password)
            if (!comparePassword) throw new BadRequestException(AUTH_ERROR_CODE.A_002, AUTH_ERROR_MESSAGE[AUTH_ERROR_CODE.A_002])
            
            const generateLogin = await this.authService.createLogin({email, userId: checkExistEmail.id})
            return BaseResponse.SuccessResponse(res, generateLogin)
        } catch (err) {
            next(err)
        }
    }
    
    public async refreshToken(req: Request, res: Response, next: NextFunction) {
        try {
        
        } catch (err) {
            next(err)
        }
    }
}