"use strict";

var express = require("express");

var router = express.Router();

var controller = require("../../controllers/client/cart.controller");

router.get("/", controller.index);
router.post("/add/:productId", controller.addPost);
router.get("/delete/:id", controller["delete"]);
router.get("/update/:productId/:quantity", controller.updateQuantity);
module.exports = router;