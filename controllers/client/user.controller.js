const User = require("./../../models/user.model");
const md5 = require("md5");
// GET  /user/register

module.exports.register = async (req, res) => {
  res.render("client/pages/user/register");
};

// POST  /user/register
module.exports.registerPost = async (req, res) => {
  //   console.log(req.body);
  const existEmail = await User.findOne({ email: req.body.email });
  if (existEmail) {
    req.flash("error", "Email đã tồn tại");
    res.redirect("back");
    return;
  }
  req.body.password = md5(req.body.password);
  const user = new User(req.body);
  await user.save();
  res.cookie("tokenUser", user.tokenUser);
  res.redirect("/");
};
