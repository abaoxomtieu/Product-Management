const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/users.controller");
const validate = require("../../validates/client/user.validate");
const authMiddleware = require("../../middlewares/client/auth.middleware")


router.get("/not-friend",authMiddleware.requireAuth, controller.notFriend);
router.get("/request",authMiddleware.requireAuth, controller.request);





module.exports = router;
