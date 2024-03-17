// GET  /admin/settings/general
const SettingGeneral = require("../../models/settings-general.model");

module.exports.general = async (req, res) => {
  const data = await SettingGeneral.findOne({});

  res.render("admin/pages/settings/general", {
    data: data,
    pageTitle: "Cài đặt chung",
  });
};
module.exports.generalPatch = async (req, res) => {
  const existSettingGeneral = await SettingGeneral.findOne({});
  if (existSettingGeneral) {
    await SettingGeneral.updateOne({ _id: existSettingGeneral.id }, req.body);
    req.flash("success", "Cập nhật cài đặt chung thành công");
  } else {
    const settingGeneral = new SettingGeneral(req.body);
    settingGeneral.save();
    req.flash("error", "Đã tạo cài đặt chung thành công");
  }

  res.redirect("back");
};
