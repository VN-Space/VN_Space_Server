const mongoose = require("mongoose");
const { Options } = require("./index");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      default: "",
    },
    role: {
      type: String,
      require: true,
      default: "user",
    },
    email: {
      type: String,
      required: true,
      default: "",
    },
    password: {
      type: String,
      require: true,
      default: "",
    },
    token: { type: String, default: "" },
    address: { type: String, default: "" },
    avatar: {
      type: String,
      default: "avtar_default.png",
    },
    background: { type: String, default: "" },
    phone: { type: Number, default: null },
    dayOfBirth: { type: String, default: "" },
    accceptor: { type: Boolean, default: false },
    verify: { type: Boolean, default: false },
    provider: { type: String, default: "" },
    providerId: { type: String, default: "" },
    gender: { type: String, default: "" },
  },
  Options
);
module.exports = mongoose.model("users", userSchema);
