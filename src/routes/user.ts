import { Application, Router } from 'express';
import { BaseRoutesConfig } from '../common';
import { UserController } from '../modules';
import { validator, validateRegister } from "../middleware";

export class UserRoutes extends BaseRoutesConfig {
    private readonly userController: UserController;
    constructor(app: Application) {
        super(app, 'user-routes', '/users');
        this.userController = new UserController();
        this.configureRoutes();
    }
    
    configureRoutes(): Router {
        this.getAppRouter.post('/register', validator.validateBody(validateRegister), this.userController.register);
        
        return this.getAppRouter;
    }
}
