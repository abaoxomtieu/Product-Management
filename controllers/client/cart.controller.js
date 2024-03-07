const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const productsHelper = require("../../helpers/products");
//GET /cart/
module.exports.index = async (req, res) => {
  const cartId = req.cookies.cartId;
  const cart = await Cart.findOne({
    _id: cartId,
  });

  // console.log(cart.products);
  let array = [];
  var total = 0;
  if (cart.products.length > 0) {
    for (const item of cart.products) {
      const productId = item.product_id;
      const productInfo = await Product.findOne({
        _id: productId,
      }).select("title thumbnail slug price discountPercentage");
      productInfo.quantity = item.quantity;
      productInfo.priceNew = productsHelper.priceNewProduct(productInfo);
      productInfo.total = productInfo.quantity * productInfo.priceNew;
      array.push(productInfo);
      total += productInfo.total;
    }
  }

  res.render("client/pages/cart/index", {
    pageTitle: "Giỏ hàng",
    products: array,
    total: total,
  });
};

//POST /cart/add/:productId
module.exports.addPost = async (req, res) => {
  const productId = req.params.productId;
  const quantity = parseInt(req.body.quantity);
  const cartId = req.cookies.cartId;
  const cart = await Cart.findOne({
    _id: cartId,
  });
  // find use fo js
  const existProductCart = cart.products.find(
    (item) => item.product_id == productId
  );
  console.log(existProductCart);
  if (existProductCart) {
    const quantityNew = existProductCart.quantity + quantity;
    // use this to set again value of an object in array
    await Cart.updateOne(
      { _id: cartId, "products.product_id": productId },
      {
        $set: { "products.$.quantity": quantityNew },
      }
    );
  } else {
    const objectCart = {
      product_id: productId,
      quantity: quantity,
    };
    await Cart.updateOne({ _id: cartId }, { $push: { products: objectCart } });
  }

  req.flash("success", "Đã thêm sản phẩm vào giỏ hàng");
  res.redirect("back");
};
