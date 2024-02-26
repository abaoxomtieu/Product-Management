// GET  /admin/products
const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const { posix } = require("path");

module.exports.index = async (req, res) => {
  //   console.log(req.query.status);

  //filter status
  filterStatus = filterStatusHelper(req.query);

  let find = {
    deleted: false,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }
  //End filter status

  //search
  const objectSearch = searchHelper(req.query);

  // console.log(objectSearch)

  let keyword = "";
  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }
  //End search

  //Pagination
  countProducts = await Product.countDocuments(find);

  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 4,
    },
    req.query,
    countProducts
  );

  //End panigation

  const products = await Product.find(find)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip).sort({position: 'desc'});

  res.render("admin/pages/products/index", {
    pageTitle: "Products list",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
  });
};
// PATCH /change-status/:status/:id

module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  await Product.updateOne({ _id: id }, { status: status });
  req.flash('success', 'Update successful');

  res.redirect("back");
};
// PATCH /change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");

  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      req.flash('success', `Update successful for ${ids.length} products` );
      break;

    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      req.flash('success', `Update successful for ${ids.length} products`);
      break;
    case "delete-all":
      await Product.updateMany(
        { _id: { $in: ids } },
        { deleted: true },
        { deletedAt: new Date() }
      );
      req.flash('success', `Delete successful for ${ids.length} products`);
    case "change-position":
      console.log(ids);
      for (const item of ids) {
        const [id, position] = item.split("-");
        console.log(id, position);
        await Product.updateOne({ _id: id }, { position: parseInt(position) });
      }
      req.flash('success', `Change position successful for ${ids.length} products`);

    default:
      break;
  }

  res.redirect("back");
};
// DELETE delete-item
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;

  await Product.updateOne(
    { _id: id },
    { deleted: true, deletedAt: new Date() }
  );
  req.flash('success', `Delete successful for product`);
  res.redirect("back");
};

// GET recycle bin

module.exports.recycle = async (req, res) => {
  //filter status
  filterStatus = filterStatusHelper(req.query);

  let find = {
    deleted: true,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }
  //End filter status

  //search
  const objectSearch = searchHelper(req.query);

  // console.log(objectSearch)

  let keyword = "";
  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }
  //End search

  //Pagination
  countProducts = await Product.countDocuments(find);

  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 4,
    },
    req.query,
    countProducts
  );

  //End panigation

  const products = await Product.find(find)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);

  res.render("admin/pages/products/recycle", {
    pageTitle: "danh sach san pham",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
  });
};

// DELETE /recycle/delete/:id
module.exports.permanentlyDelete = async (req, res) => {
  const id = req.params.id;

  await Product.deleteOne({ _id: id });

  res.redirect("back");
};

// PATCH /recycle/restore/:id

module.exports.Restore = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  await Product.updateOne({ _id: id }, { deleted: false });

  res.redirect("back");
};
