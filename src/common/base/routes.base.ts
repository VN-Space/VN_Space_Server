import { Application, Router } from 'express';
import { BaseController } from '.';

interface IBaseRoutesConfig {
    get getAppRouter(): Router
}

export abstract class BaseRoutesConfig extends BaseController implements IBaseRoutesConfig{
    private readonly app: Application;
    private readonly router: Router;
    
    protected constructor(app: Application, protected name: string, protected prefixUrl: string) {
        super();
        this.app = app;
        this.name = name;
        this.router = Router();
        this.app.use(prefixUrl, this.router);
    }
    
    get getAppRouter() {
        return this.router;
    }
    
    abstract configureRoutes(): Router;
}