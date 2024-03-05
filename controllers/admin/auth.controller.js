// GET  /admin/auth/login
const Role = require("../../models/role.model");
const systemConfig = require("../../config/system");
const Account = require("../../models/account.model");
const md5 = require("md5");

module.exports.login = (req, res) => {
  res.render("admin/pages/auth/login", {
    pageTitle: "Login page",
  });
};
module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await Account.findOne({
    email: email,
    deleted: false,
  });
  if (!user) {
    req.flash("error", "Email not valid");
    res.redirect("back");
    return;
  }
  if (md5(password) != user.password) {
    req.flash("error", "Password incorrect!");
    res.redirect("back");
    return;
  }
  if (user.status == "inactive") {
    req.flash("error", "Account is locked!");
    res.redirect("back");
    return;
  }

  res.cookie("token", user.token)
  res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
};


module.exports.logout = async (req, res) => {
    // Xóa token trong cookie 
    res.clearCookie("token");
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
    
} 