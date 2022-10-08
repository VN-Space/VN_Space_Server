const mongoose = require("mongoose");

module.exports = async () => {
  await mongoose
    .connect(process.env.MONGOOSE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.log("Unable to connect database with error:" + error);
    process.exit(1);
    });
};
