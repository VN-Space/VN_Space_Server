import express from 'express';
import { BaseController, BaseRoutesConfig } from './common';
import { AuthRoutes, UserRoutes } from './routes'

export class RootRoutes extends BaseController {
    private readonly routes: Array<BaseRoutesConfig> = [];
    
    constructor(app: express.Application) {
        super();
        this.routes.push(new AuthRoutes(app));
        this.routes.push(new UserRoutes(app));
    }
    
    get getRoutes(): BaseRoutesConfig[] {
        return this.routes;
    }
}
