const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/product.controller");


router.get("/", controller.index);
router.get("/recycle", controller.recycle);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);
router.delete("/delete/:id", controller.deleteItem);
router.delete("/recycle/delete/:id", controller.permanentlyDelete);
router.patch("/recycle/restore/:id", controller.Restore);







module.exports = router;
