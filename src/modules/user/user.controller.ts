import { NextFunction, Request, Response } from 'express'
import { BadRequestException, BaseController, BaseResponse, HttpStatusCode } from "../../common";
import { UserService } from "./user.service";
import { USER_ERROR_CODE, USER_ERROR_MESSAGE } from "./user.message";

export class UserController extends BaseController {
    private readonly userService: UserService
    
    constructor() {
        super();
        this.userService = new UserService()
    }
    
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const {email} = req.body
            const checkEmailExisted = await this.userService.findByEmail(email, '-password');
            if (checkEmailExisted) {
                throw new BadRequestException(USER_ERROR_CODE.U_001, USER_ERROR_MESSAGE[USER_ERROR_CODE.U_001], HttpStatusCode.BAD_REQUEST)
            }
            const createAccount = await this.userService.createAccount({...req.body})
            if (!createAccount) {
                throw new BadRequestException(USER_ERROR_CODE.U_001, USER_ERROR_MESSAGE[USER_ERROR_CODE.U_001], HttpStatusCode.BAD_REQUEST)
            }
            return BaseResponse.SuccessResponse(res)
        } catch (e) {
            next(e)
        }
    }
    
    
}