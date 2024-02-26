const express = require("express");
const router = express.Router();
const multer = require("multer");
const fileUpload = multer();
const controller = require("../../controllers/admin/product.controller");
const validate = require("../../validates/admin/product.validate");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/", controller.index);
router.get("/recycle", controller.recycle);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);
router.delete("/delete/:id", controller.deleteItem);
router.delete("/recycle/delete/:id", controller.permanentlyDelete);
router.patch("/recycle/restore/:id", controller.Restore);

router.get("/create", controller.create);
router.post(
  "/create",
  fileUpload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPOST,
  controller.createPOST
);
router.get("/edit/:id", controller.edit);
router.patch(
  "/edit/:id",
  fileUpload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPOST,
  controller.editPatch
);

router.get("/detail/:id", controller.detail);

module.exports = router;
