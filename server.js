const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { ApolloServer } = require("apollo-server-express");
const db = require("../plugins/db");
const typeDefs = require("./typeDevs");
const resolvers = require("./resolvers");

const app = express();

dotenv.config();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

let server = new ApolloServer({
  typeDefs,
  resolvers,
});
const port = process.env.PORT || 9000;
app.use("/api/v1", require("./src/index"));
server.start().then((res) => {
  server.applyMiddleware({ app });
  app.listen(port, () => {
    db();
    console.log(
      `Server ready at: http://localhost:${port}${server.graphqlPath}`
    );
  });
});
