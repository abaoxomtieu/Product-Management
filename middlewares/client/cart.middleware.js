const ProductCategory = require("../../models/product-category.model");
const createTreeHelper = require("../../helpers/createTree");
const Cart = require("../../models/cart.model");
const Account = require("../../models/account.model");
module.exports.cartId = async (req, res, next) => {
  // console.log(req.cookies.cartId);
  if (!req.cookies.cartId) {
    // create Cart
    const cart = new Cart();
    await cart.save();
    const expiresCookie = 1000 * 60 * 60 * 24 * 365;
    res.cookie("cartId", cart.id, {
      expires: new Date(Date.now() + expiresCookie),
    });
  } else {
    //extract it if exists
    
  }

  next();
};
