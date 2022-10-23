import { ApolloServer, BaseContext, ApolloServerOptions } from "@apollo/server";
import { BaseController } from "../common";

export class GraphqlService extends BaseController {
    private readonly apolloServer: ApolloServer
    constructor(config: ApolloServerOptions<BaseContext>) {
        super();
        this.apolloServer = new ApolloServer(config)
    }
    
    get getApolloServer() {
        return this.apolloServer
    }
}