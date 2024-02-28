// GET  /admin/product-category
const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system");
const filterStatusHelper = require("../../helpers/filterStatus");
const createTreeHelper = require("../../helpers/createTree");

module.exports.index = async (req, res) => {
  //filter status
  filterStatus = filterStatusHelper(req.query);

  let find = {
    deleted: false,
  };
  const records = await ProductCategory.find(find);
  const newRecords = createTreeHelper.tree(records);

  res.render("admin/pages/products-category/index", {
    pageTitle: "Products category",
    records: newRecords,
  });
};

// [GET] /admin/product-category/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };

  const records = await ProductCategory.find(find);

  const newRecords = createTreeHelper.tree(records);

  console.log(newRecords);

  res.render("admin/pages/products-category/create", {
    pageTitle: "Tạo danh mục sản phẩm",
    records: newRecords,
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
  const productCategory = new ProductCategory(req.body);
  await productCategory.save();
  res.redirect(`${systemConfig.prefixAdmin}/products-category`);
};

// [GET] /admin/product-category/create
// module.exports.edit = async (req, res) => {
//   let find = {
//     deleted: false
//   }

//   const records = await ProductCategory.find(find);

//   const newRecords = createTreeHelper.tree(records);

//   console.log(newRecords);

//   res.render("admin/pages/products-category/edit", {
//     pageTitle: "Edit product catergories",
//     records: newRecords
//   });
// }

// GET /admin/product-category/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    data = await ProductCategory.findOne({
      _id: id,
      deleted: false,
    });
    const records = await ProductCategory.find({ deleted: false });
    const newRecords = createTreeHelper.tree(records);
    res.render("admin/pages/products-category/edit", {
      data: data,
      records: newRecords,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
  }
};
// PATCH /admin/product-category/edit/:id
module.exports.editPatch = async (req, res) => {
  console.log(req.body);
  const id = req.params.id;

  if (req.body.position == "") {
    const countProducts = await Product.countDocuments({});
    req.body.position = countProducts + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  await ProductCategory.updateOne({ _id: id }, req.body);
  res.redirect("back");
};
