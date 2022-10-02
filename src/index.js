const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const port = process.env.PORT || 9000;
const mongoose = require("mongoose");
// apply middleware
app.use(morgan("dev"));
dotenv.config();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

//load methorDb
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
// conect();
//load typedes and resolver

app.listen(port, () =>
  console.log(`Server ready at: http://localhost:${port}`)
);
