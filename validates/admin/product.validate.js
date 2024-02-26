module.exports.createPOST = (req, res, next) => {
  if (!req.body.title) {
    req.flash("error", `Please enter a title`);
    res.redirect("back");
    return;
  } else if (req.body.title.length < 8) {
    req.flash("error", `Please enter title atleast 8 characters`);
    res.redirect("back");
    return;
  }
  next();
};
