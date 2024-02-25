// GET  /products


const Product = require("../../models/product.model");

module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: false,
  }).sort({position: 'desc'});
  const newProduct = products.map((item) => {
    item.priceNew = (
      item.price -
      item.price * (item.discountPercentage / 100)
    ).toFixed(0);
    return item;
  });
  // console.log(products);
  res.render("client/pages/products/index", {
    pageTitle: "Danh sach san pham",
    products: newProduct,
  });
};
