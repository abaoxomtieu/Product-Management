// GET  /admin/products
const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");


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
  const objectSearch = searchHelper(req.query)

  console.log(objectSearch)

  let keyword = "";
  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }
 //End search 

  const products = await Product.find(find);

  res.render("admin/pages/products/index", {
    pageTitle: "danh sach san pham",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
  });
};
