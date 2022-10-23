import { NextFunction, Request, Response } from 'express'

import { UserService } from "./user.service";
import { BadRequestException, BaseController, BaseResponse } from "../../common";
import { USER_ERROR_CODE, USER_ERROR_MESSAGE } from "./user.message";

export class UserController extends BaseController {
    private readonly userService: UserService
    constructor() {
        super();
        this.userService = new UserService()
    }
    
    public async register(req: Request, res: Response, next: NextFunction) {
        try {
            const {email} = req.body
            const checkEmailExisted = await this.userService.findByEmail(email);
            if (checkEmailExisted) {
                throw new BadRequestException(USER_ERROR_CODE.U_001, USER_ERROR_MESSAGE[USER_ERROR_CODE.U_001])
            }
            const createAccount = await this.userService.createAccount({...req.body})
            if (!createAccount) {
                throw new BadRequestException(USER_ERROR_CODE.U_001, USER_ERROR_MESSAGE[USER_ERROR_CODE.U_001])
            }
            return BaseResponse.SuccessResponse(res)
        } catch (e) {
            next(e)
        }
    }
    
    public async getUserDetailByEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const {email} = req.loggedUser
            const checkEmailExisted = await this.userService.getByEmail(email, '-isVerify -isRoot -isActive -isDeleted -createdAt -updatedAt');
            if (!checkEmailExisted) throw new BadRequestException(USER_ERROR_CODE.U_001, USER_ERROR_MESSAGE[USER_ERROR_CODE.U_001])
            return BaseResponse.SuccessResponse(res, checkEmailExisted)
        } catch (e) {
            next(e)
        }
    }
    
    public async getListUser(req: Request, res: Response, next: NextFunction) {
        try {
            const {filter, limit, skip} = req.params
            const getList = await this.userService.getListUserWithFilter(parseInt(limit, 10), parseInt(skip, 10), filter);
            if (!getList) throw new BadRequestException(USER_ERROR_CODE.U_003, USER_ERROR_MESSAGE[USER_ERROR_CODE.U_003])
            return BaseResponse.SuccessResponse(res, getList)
        } catch (e) {
            next(e)
        }
    }
}