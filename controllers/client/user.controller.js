const { request, response } = require("express");
const User = require("./../../models/user.model");
const ForgotPassword = require("../../models/forgot-password.model");
const md5 = require("md5");
const generateHelpers = require("../../helpers/generate");
const sendMailHelpers = require("../../helpers/sendMail");
const { ReturnDocument } = require("mongodb");

// GET  /user/register
module.exports.register = async (req, res) => {
  res.render("client/pages/user/register", {
    pageTitle: "Đăng ký tài khoản",
  });
};

// POST  /user/register
module.exports.registerPost = async (req, res) => {
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

  res.redirect("/");
};

// GET  /user/logout

module.exports.logout = async (req, res) => {
  res.clearCookie("tokenUser");
  res.redirect("/");
};
// GET  /user/password/forgot

module.exports.forgotPassword = async (req, res) => {
  res.render("client/pages/user/forgot-password", {
    pageTitle: "Forgot Password",
  });
};

// POST  /user/password/forgot

module.exports.forgotPasswordPost = async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email: email, deleted: false });
  if (!user) {
    req.flash("error", "Email không tồn tại!");
    res.redirect("back");
    return;
  }

  const existEmail = await ForgotPassword.findOne({ email: email });
  const otp = generateHelpers.generateRandomNumber(8);
  if (!existEmail) {
    const objectForgotPassword = {
      email: email,
      otp: otp,
      expireAt: Date.now(),
    };
    const forgotPassword = new ForgotPassword(objectForgotPassword);
    await forgotPassword.save();
    req.flash("success", `Mã OTP đã được gửi đến ${email}`);
  } else {
    req.flash("error", `Mã OTP đã được gửi đến ${email}. Thử lại sau 3 phút`);
    res.redirect("back");
    return;
  }
  const subject = "Mã OTP xác minh lấy lại mật khẩu";
  const html = `
  Mã OTP để lấy lại mật khẩu là <b>${otp}</b>. Thời hạn sử dụng là 3 phút`;

  sendMailHelpers.sendMail(email, subject, html);
  res.redirect(`/user/password/otp?email=${email}`);
};
// GET  /user/password/otp

module.exports.otpPassword = async (req, res) => {
  const email = req.query.email;

  res.render("client/pages/user/otp-password", {
    pageTitle: "Nhập mã OTP",
    email: email,
  });
};
// POST  /user/password/otp

module.exports.otpPasswordPost = async (req, res) => {
  const email = req.body.email;
  const otp = req.body.otp;
  const verify = await ForgotPassword.findOne({
    email: email,
    otp: otp,
  });
  if (!verify) {
    req.flash("error", "OTP không hợp lệ!");
    res.redirect("back");
    return;
  }
  const user = await User.findOne({ email: email });
  res.cookie("tokenUser", user.tokenUser);
  res.redirect("/user/password/reset");
};

// GET  /user/password/reset

module.exports.resetPassword = async (req, res) => {

  res.render("client/pages/user/reset-password", {
    pageTitle: "Đổi mật khẩu",
  });
};

// POST  /user/password/reset

module.exports.resetPasswordPost = async (req, res) => {
  const password = req.body.password;
  const tokenUser = req.cookies.tokenUser;
  const confirmPassword = req.body.confirmPassword;
  await User.updateOne(
    {
      tokenUser: tokenUser,
    },
    {
      password: md5(password),
    }
  );
  req.flash("success", "Đổi mật khẩu thành công");
  res.redirect("/");
};

// GET  /user/info

module.exports.info = async (req, res) => {
  res.render("client/pages/user/info", {
    pageTitle: "Thông tin tài khoản",
  });
};
