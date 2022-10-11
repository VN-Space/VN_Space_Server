const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const port = process.env.PORT || 9000;
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const FacebookStrategy = require("passport-facebook");
const jwt_decode = require("jwt-decode");
const { facebookOptions, facebookCallback } = require("./middlewares/passport");
// apply middleware
// app.use(morgan("dev"));
dotenv.config();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(session({ secret: "keyboard cat", key: "sid" })); //Save user login
app.use("/public", express.static(__dirname + "/public/assets"));

// Passport session setup.
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));
//setup ejs
app.set("views", path.join(__dirname, "views/page"));
app.set("view engine", "ejs");
app.engine("ejs", require("ejs").renderFile);
//conect mongoodb
const dbMethors = require("./dbMethods");
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
// login facebook
passport.use(new FacebookStrategy(facebookOptions, facebookCallback));
app.use(cookieParser()); //Parse cookie
app.use(bodyParser.urlencoded({ extended: false })); //Parse body để get data
app.use(passport.initialize());
app.use(passport.session());
// load router
require("./routers/auth.router")(app);
require("./routers/view.router")(app);
// load typedes and resolver
const typeDefs = require("./typeDevs");
const resolvers = require("./resolvers");
// connect aplloServer
let server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ dbMethors }),
});
// run server
server.start().then((res) => {
  server.applyMiddleware({ app });
  app.listen(port, () =>
    console.log(
      `Server ready at: http://localhost:${port}${server.graphqlPath}`
    )
  );
});
