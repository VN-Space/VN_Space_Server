const path = require("path");
const { gql } = require("apollo-server-express");
const { loadFilesSync } = require("@graphql-tools/load-files");
const getTypeDefs = loadFilesSync(path.join(__dirname, "./types"));

const typeDefs = gql`
  ${getTypeDefs}
`;
module.exports = typeDefs;
