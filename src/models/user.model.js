const mongoose = require("mongoose");
const { Options } = require("./index");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      require: true,
      default: "user",
    },
    email: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "avtar_default.png",
    },
    password: {
      type: String,
      require: true,
    },
    dayOfBirth: {
      type: String,
    },
    totalPost: {
      type: Number,
      default: 0,
    },
    totalLike: { type: Number, default: 0 },
    token: { type: String },
  },
  Options
);
module.exports = mongoose.model("users", userSchema);
