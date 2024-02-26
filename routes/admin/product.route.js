const express = require("express");
const router = express.Router();
const multer = require("multer");
const storageMulter = require("../../helpers/storageMulter");
const upload = multer({ storage: storageMulter() });
const controller = require("../../controllers/admin/product.controller");

router.get("/", controller.index);
router.get("/recycle", controller.recycle);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);
router.delete("/delete/:id", controller.deleteItem);
router.delete("/recycle/delete/:id", controller.permanentlyDelete);
router.patch("/recycle/restore/:id", controller.Restore);

router.get("/create", controller.create);
router.post("/create", upload.single("thumbnail"), controller.createPOST);

module.exports = router;
