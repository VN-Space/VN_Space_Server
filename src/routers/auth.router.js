const passport = require("passport");
module.exports = (User) => {
  const AuthController = require("../controllers/auth.controller");
  User.get(
    "/auth/facebook",
    passport.authenticate("facebook", { scope: ["email"] })
  );
  User.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      successRedirect: "/profile/facebook",
      failureRedirect: "/login",
    }),
    function (req, res) {
      res.redirect("/");
    }
  );
  User.get("/profile/facebook", AuthController.profileFaceBook),
    User.get("/logout/facebook", function (req, res, next) {
      req.logout(function (err) {
        if (err) {
          return next(err);
        }
        res.status("200").json({
          status: false,
          message: "logout facebook successful",
          data: [],
        });
      });
    });
};
