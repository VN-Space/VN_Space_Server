const { Users } = require("../models");
// const bcrypt = require("bcryptjs");
console.log("User", Users);
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const pbkdf2 = require("pbkdf2");
const UserController = {
  getAllUsers: async (condition = null) =>
    condition === null ? await Users.find() : await Users.find(condition),
  getUserById: async (_id) => Users.findById({ _id: _id }),
};
module.exports = UserController;
