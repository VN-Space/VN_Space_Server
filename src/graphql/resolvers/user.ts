import { FilterQuery } from "mongoose";
import { GraphQLResolveInfo } from "graphql/type";
import { IResolvers } from "@graphql-tools/utils"
import { UserRepository } from "../../modules/user/user.repository";
import { IUser } from "../../modules";
import { Authorization } from "../../middleware";

const userRepository = new UserRepository()
const authorization = new Authorization()

export const UserResolvers: IResolvers = {
    Query: {
        getListUser: (_: void, args: { filter: FilterQuery<IUser>, limit: number, skip: number }, ctx: any, _info: GraphQLResolveInfo) => {
            const {filter, limit, skip} = args
            return userRepository.getListUserWithFilter(limit, skip, filter);
        },
    }
}