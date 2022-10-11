const { Users } = require("../models");

exports.profileFaceBook = async (req, res) => {
  const { profile, accessToken } = req.user;
  const checkUser = await Users.find({ providerID: profile.id });
  if (checkUser.length > 0) {
    const newdata = {
      ...checkUser[0]._doc,
      updateAt: Date.now(),
      token: accessToken,
    };
    res.status("200").json({
      status: true,
      data: newdata,
      message: "login face success",
    });
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
    res.status("200").json({
      status: true,
      data: returnUser,
      message: "login face success",
    });
  }
};
