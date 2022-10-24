import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors'
import helmet from "helmet";
import { ApolloServerOptions, BaseContext } from "@apollo/server";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { expressMiddleware } from "@apollo/server/express4";
import { InMemoryLRUCache } from "@apollo/utils.keyvaluecache";
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';
import { ApolloServerPluginCacheControl } from "@apollo/server/plugin/cacheControl";

import { ERROR_CODE } from '../constants';
import { RootRoutes } from '../root.routes';
import { MongooseService } from "./mongoose.service";
import { GraphqlService } from "./graphql.service";
import { logger, morganMiddleware } from '../configs';
import {
    APIError,
    BaseController,
    BaseError,
    HttpStatusCode,
    errorHandler
} from '../common';
import { UserResolvers, UserTypeDefs } from "../graphql"
import { Authorization } from "../middleware";

export class AppConfig extends BaseController {
    private readonly app: Application;
    private readonly graphqlService: GraphqlService
    private readonly rootRoute: RootRoutes;
    private readonly mongooseService: MongooseService
    private readonly authorization: Authorization
    
    constructor(mongoURL: string) {
        super();
        this.app = express();
        this.configureApp();
        this.getHealthCheck();
        
        this.graphqlService = new GraphqlService(this.configApolloServer())
        this.rootRoute = new RootRoutes(this.app);
        this.mongooseService = new MongooseService()
        this.authorization = new Authorization()
        
        this.graphqlService.getApolloServer.start().then(() => {
            logger.info('[Apollo Server] Apollo server is online.')
            this.app.use('/graphql', expressMiddleware(this.graphqlService.getApolloServer, {
                context: this.authorization.isValidAccessTokenGraphql
            }));
            
            this.getRoutes().getRoutes;
            
            this.catch404();
            this.catchError();
            
            this.mongooseService.connectToDBWithRetry(mongoURL)
        })
    }
    
    private configureApp() {
        this.app.use(helmet());
        this.app.use(cors());
        this.app.set('trust proxy', true);
        this.app.use(express.json({limit: '10mb'}));
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(morganMiddleware);
    }
    
    private configApolloServer() {
        const configApolloServer = makeExecutableSchema({
            typeDefs: [UserTypeDefs],
            resolvers: [UserResolvers],
        });
        
        const config: ApolloServerOptions<BaseContext> = {
            schema: configApolloServer,
            introspection: true,
            cache: new InMemoryLRUCache({
                maxSize: Math.pow(2, 20) * 100,
                ttl: 60 * 60
            }),
            persistedQueries: {
                ttl: 900 // 15 minutes
            },
            logger,
            plugins: [
                ApolloServerPluginInlineTrace(),
                ApolloServerPluginCacheControl({
                    defaultMaxAge: 60 * 60 * 24,
                    // Don't send the `cache-control` response header.
                    calculateHttpHeaders: false,
                }),
            ]
        }
        
        return config;
    }
    
    private getHealthCheck() {
        this.app.get('/health-check', (req: Request, res: Response) => {
            return res.send('ok');
        });
    }
    
    private getRoutes() {
        return this.rootRoute;
    }
    
    private catch404() {
        this.app.use((req: Request) => {
            throw new APIError(ERROR_CODE.E404, HttpStatusCode.NOT_FOUND_ERROR, 'NOT_FOUND_ROUTE', req);
        });
    }
    
    private catchError() {
        this.app.use((error: BaseError, req: Request, res: Response, next: NextFunction) => {
            errorHandler.handleError(error, res);
        });
    }
    
    get getApp() {
        return this.app;
    }
}
