const express = require("express");
const router = express.Router();
const multer = require("multer");
const fileUpload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const validate = require("../../validates/admin/account.validate");
const controller = require("../../controllers/admin/account.controller");

router.get("/", controller.index);
router.get("/create", controller.create);
router.post(
  "/create",
  fileUpload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  controller.createPost
);
router.get("/edit/:id", controller.edit);
router.patch(
  "/edit/:id",
  fileUpload.single("thumbnail"),
  uploadCloud.upload,
  validate.editPatch,
  controller.editPatch
);

module.exports = router;
