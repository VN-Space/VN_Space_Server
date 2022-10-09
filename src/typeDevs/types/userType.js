const { gql } = require("apollo-server-express");
module.exports = /* GraphQL */ `
  type Login {
    data: User
    status: Boolean
    message: String
  }
  type User {
    _id: ID!
    name: String
    role: String
    email: String
    avatar: String
    password: String
    dayOfBirth: String
    totalPost: Int
    totalLike: Int
    token: String
  }

  #ROOT TYPE
  type Query {
    users: [User]
    user(_id: ID!): User
  }
`;
