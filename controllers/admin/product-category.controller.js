// GET  /admin/product-category
const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system");
const filterStatusHelper = require("../../helpers/filterStatus");

module.exports.index = async (req, res) => {
  //filter status
  filterStatus = filterStatusHelper(req.query);

  let find = {
    deleted: false,
  };
  const records = await ProductCategory.find(find);

  res.render("admin/pages/products-category/index", {
    pageTitle: "Products category",
    records: records,
  });
};

// GET  /admin/product-category/create

module.exports.create = (req, res) => {
  res.render("admin/pages/products-category/create", {
    pageTitle: "Products category create",
  });
};

// POST  /admin/product-category/create

module.exports.createPOST = async (req, res) => {
  if (req.body.position == "") {
    const count = await ProductCategory.countDocuments({});
    req.body.position = count + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  console.log(req.body);

  const productCategory = new ProductCategory(req.body);
  await productCategory.save();
  res.redirect(`${systemConfig.prefixAdmin}/products-category`);
};
