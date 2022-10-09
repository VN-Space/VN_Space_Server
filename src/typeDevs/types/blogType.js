const { gql } = require("apollo-server-express");
module.exports = /* GraphQL */ `
  type Blog {
    _id: ID!
  }
  # ROOT type
  type Query {
    blogs: [Blog]
  }
`;
