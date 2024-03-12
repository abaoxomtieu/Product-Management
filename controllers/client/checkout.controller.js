const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const productsHelper = require("../../helpers/products");
const Order = require("../../models/order.model");
// [GET]
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
  res.render("client/pages/checkout/index", {
    pageTitle: "Đặt hàng",
    products: array,
    total: total,
  });
};

//POST checkout/order
module.exports.order = async (req, res) => {
  const cartId = req.cookies.cartId;
  const userInfo = req.body;
  const cart = await Cart.findOne({ _id: cartId });
  const products = [];

  for (const product of cart.products) {
    const objectProduct = {
      product_id: product.product_id,
      price: 0,
      discountPercentage: 0,
      quantity: product.quantity,
    };
    const productInfo = await Product.findOne({
      _id: product.product_id,
    }).select("price discountPercentage");
    objectProduct.price = productInfo.price;
    objectProduct.discountPercentage = productInfo.discountPercentage;
    products.push(objectProduct);
  }

  const orderInfo = { cart_id: cartId, userInfo: userInfo, products: products };
  const order = new Order(orderInfo);
  order.save();
  await Cart.updateOne({ _id: cartId }, { products: [] });
  res.redirect(`/checkout/success/${order.id}`);
};

//GET checkout/success
module.exports.success = async (req, res) => {
  const orderId = req.params.orderId;

  const order = await Order.findOne({ _id: orderId });
  for (const product of order.products) {
    const productInfo = await Product.findOne({
      _id: product.product_id,
    }).select("title thumbnail slug");
    product.productInfo = productInfo;
    product.priceNew = productsHelper.priceNewProduct(product);
    product.totalPrice = product.priceNew * product.quantity;

  }
  order.totalPrice = order.products.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );
  console.log(order.products)
  res.render("client/pages/checkout/success", {
    pageTitle: "Đặt hàng thành công",
    order: order,
  });
};
