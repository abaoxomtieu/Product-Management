const User = require("./../../models/user.model");
const md5 = require("md5");
// GET  /user/register

module.exports.register = async (req, res) => {
  res.render("client/pages/user/register", {
    pageTitle: "Đăng ký tài khoản",
  });
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

// GET  /user/login

module.exports.login = async (req, res) => {
  res.render("client/pages/user/login", {
    pageTitle: "Đăng ký tài khoản",
  });
};

// POST  /user/register
module.exports.loginPost = async (req, res) => {
  //   console.log(req.body);
  const email = req.body.email;
  const password = md5(req.body.password);
  const user = await User.findOne({ email: email, deleted: false });

  if (user) {
    if (user.password == password) {
      res.cookie("tokenUser", user.tokenUser);
    } else {
      req.flash("error", "Sai mật khẩu");
      res.redirect("back");
      return;
    }
  } else {
    req.flash("error", "Email không tồn tại");
    res.redirect("back");
    return;
  }
  if (user.status == "inactive") {
    req.flash("error", "Tài khoản bị khóa");
    res.redirect("back");
    return;
  }

  res.redirect("/")
};
