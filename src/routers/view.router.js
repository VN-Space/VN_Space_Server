module.exports = (View) => {
  View.get("/", function (req, res) {
    res.render("index");
  });
};
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
