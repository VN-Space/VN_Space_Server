import { Application, Router } from 'express';
import { BaseRoutesConfig } from '../common';
import { UserController } from '../modules';
import { validator, validateRegister, Authorization } from "../middleware";

export class UserRoutes extends BaseRoutesConfig {
    private readonly authorization: Authorization;
    private readonly userController: UserController;
    constructor(app: Application) {
        super(app, 'user-routes', '/users');
        this.authorization = new Authorization()
        this.userController = new UserController();
        this.configureRoutes();
    }
    
    configureRoutes(): Router {
    
        this.getAppRouter.get('/detail', this.authorization.isValidAccessToken, this.userController.getUserDetailByEmail);
        this.getAppRouter.get('/list', this.authorization.isValidAccessToken, this.userController.getListUser);
        
        this.getAppRouter.post('/register', validator.validateBody(validateRegister), this.userController.register);
        
        return this.getAppRouter;
    }
}
