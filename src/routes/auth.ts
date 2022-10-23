import { Application, Router } from 'express';
import { BaseRoutesConfig } from '../common';
import { AuthController } from '../modules';
import { validator, Authorization, validateLogin } from "../middleware";

export class AuthRoutes extends BaseRoutesConfig {
    private readonly authorization: Authorization
    private readonly authController: AuthController;
    constructor(app: Application) {
        super(app, 'auth-routes', '/auth');
        this.authorization = new Authorization()
        this.authController = new AuthController();
        this.configureRoutes();
    }
    
    configureRoutes(): Router {
        this.getAppRouter.post('/login',
            validator.validateBody(validateLogin),
            this.authController.login
        );
    
        this.getAppRouter.post('/refresh-token',
            this.authorization.isValidAccessToken,
            this.authorization.isValidRefreshToken,
            this.authController.refreshToken
        );
    
        return this.getAppRouter;
    }
}
