const dotenv = require("dotenv");
dotenv.config();
const { Users } = require("../models");
const facebookOptions = {
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: process.env.FACEBOOK_URL_CALLBACK,
};
const facebookCallback = (accessToken, refreshToken, profile, done) => {
  process.nextTick(async () => done(null, { profile, accessToken }));
};

module.exports = {
  facebookOptions,
  facebookCallback,
};
