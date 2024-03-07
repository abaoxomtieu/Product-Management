const Cart = require("../../models/cart.model");

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
