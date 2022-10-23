import { NextFunction, Request, Response } from "express";

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
            const checkExistEmail = await this.userService.findUserByEmailWithPassword(email)
            if (!checkExistEmail) throw new BadRequestException(AUTH_ERROR_CODE.A_002, AUTH_ERROR_MESSAGE[AUTH_ERROR_CODE.A_002])
            if(!checkExistEmail.isActive) throw new BadRequestException(AUTH_ERROR_CODE.A_003, AUTH_ERROR_MESSAGE[AUTH_ERROR_CODE.A_003])
    
            const comparePassword = await this.authService.comparePassword(password, checkExistEmail.password)
            if (!comparePassword) throw new BadRequestException(AUTH_ERROR_CODE.A_002, AUTH_ERROR_MESSAGE[AUTH_ERROR_CODE.A_002])
    
            const generateJWT = this.authService.createJWT({email, userId: checkExistEmail.id})
            if (!generateJWT) throw new BadRequestException(AUTH_ERROR_CODE.A_002, AUTH_ERROR_MESSAGE[AUTH_ERROR_CODE.A_002])
            return BaseResponse.SuccessResponse(res, generateJWT)
        } catch (err) {
            next(err)
        }
    }
    
    public async refreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, userId} = req.body
            const generateJWT = this.authService.createJWT({email, userId})
            if (!generateJWT) throw new BadRequestException(AUTH_ERROR_CODE.A_001, AUTH_ERROR_MESSAGE[AUTH_ERROR_CODE.A_001])
            return BaseResponse.SuccessResponse(res, generateJWT)
        } catch (err) {
            next(err)
        }
    }
}