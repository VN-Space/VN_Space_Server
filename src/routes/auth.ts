import { Application, Router } from 'express';
import { BaseRoutesConfig } from '../common';
import { AuthController } from '../modules';
import { validator, Authorization, validateLogin } from "../middleware";

export class AuthRoutes extends BaseRoutesConfig {
    private readonly authController: AuthController;
    private readonly authorization: Authorization
    constructor(app: Application) {
        super(app, 'auth-routes', '/auth');
        this.authController = new AuthController();
        this.authorization = new Authorization()
        this.configureRoutes();
    }
    
    configureRoutes(): Router {
        this.getAppRouter.post('/login', validator.validateBody(validateLogin), this.authController.login);
        
        this.getAppRouter.post('/refresh-token', this.authorization.isValidAccessToken, this.authController.refreshToken);
        
        return this.getAppRouter;
    }
}
