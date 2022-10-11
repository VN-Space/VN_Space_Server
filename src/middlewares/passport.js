const dotenv = require("dotenv");
dotenv.config();
const { Users } = require("../models");
const facebookOptions = {
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: process.env.FACEBOOK_URL_CALLBACK,
};
const facebookCallback = (accessToken, refreshToken, profile, done) => {
  process.nextTick(async () => {
    const checkUser = await Users.find({ providerID: profile.id });
    if (checkUser.length > 0) {
      const newdata = {
        ...checkUser[0]._doc,
        updateAt: Date.now(),
        token: accessToken,
      };
      return done(null, newdata);
    } else {
      const newUser = {
        name: profile.displayName,
        provider: profile.provider,
        providerID: profile.id,
        token: accessToken,
        email: profile.email ? profile.email : "test@gmail.com",
      };
      const createNewUser = await new Users(newUser);
      const returnUser = await createNewUser.save();
      return done(null, returnUser);
    }
  });
};

module.exports = {
  facebookOptions,
  facebookCallback,
};
