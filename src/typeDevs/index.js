const { gql } = require("apollo-server-express");
const typeDefs = gql`
  type Login {
    data: User
    status: Boolean
    message: String
  }
  type User {
    userName: String
  }

  #ROOT TYPE
  type Query {
    users: [User]
  }
`;
module.exports = typeDefs;
