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
    token: String
    dress: String
    background: String
    phone: Int
    accept: Boolean
    verify: Boolean
    createAt: String
    updateAt: String
    provider: String
    provicerId: String
    gender: String
  }

  #ROOT TYPE
  type Query {
    users: [User]
    user(_id: ID!): User
  }
`;
