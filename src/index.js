const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const port = process.env.PORT || 9000;
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
// apply middleware
// app.use(morgan("dev"));
dotenv.config();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
// app.use("/avatar", express.static(__dirname + "/resoures/avatars"));
//load methorDb
// const dbMethors = require("./db/methorDb");
//conect mongoodb
console.log(process.env.MONGOOSE_URL);
const conect = async () => {
  try {
    await mongoose.connect(`${process.env.MONGOOSE_URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected mongoodb");
  } catch (e) {
    console.log("Error", e.message);
    process.exit(1);
  }
};
conect();
// load typedes and resolver
const typeDefs = require("./typeDevs");
const resolvers = require("./resolvers");
let server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: () => ({ dbMethors }),
});

server.start().then((res) => {
  server.applyMiddleware({ app });
  app.listen(port, () =>
    console.log(
      `Server ready at: http://localhost:${port}${server.graphqlPath}`
    )
  );
});
