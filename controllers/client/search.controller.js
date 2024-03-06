const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");
const productsHelper = require("../../helpers/products");
const productsCategoryHelper = require("../../helpers/products-category");
// GET  /search

module.exports.index = async (req, res) => {
  const keyword = req.query.keyword;
  let newProduct = [];
  if (keyword) {
    const regex = new RegExp(keyword, "i"); // i does not distinguish between uppercase and lowercase letters
    const products = await Product.find({
      title: regex,
      deleted: false,
      status: "active",
    });
    
    newProduct = productsHelper.priceNewProducts(products);
    console.log(newProduct);
  }
  

  res.render("client/pages/search/index", {
    pageTitle: "Tìm kiếm",
    keyword: keyword,
    products: newProduct,
  });
};
