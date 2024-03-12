const express = require("express");
const router = express.Router();
const multer = require("multer");
const fileUpload = multer();
const validate = require("../../validates/admin/product.validate");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const controller = require("../../controllers/admin/blog.controller");

router.get("/", controller.index);
router.get("/create", controller.create);
router.post(
    "/create",
    fileUpload.single("thumbnail"),
    uploadCloud.upload,
    validate.createPOST,
    controller.createPOST
  );



module.exports = router;
