// GET  /admin/products
const Product = require("../../models/product.model");
module.exports.index = async (req, res) => {
  //   console.log(req.query.status);

  let filterStatus = [
    {
      name: "All",
      status: "",
      class: "",
    },
    {
      name: "Active",
      status: "active",
      class: "",
    },
    {
      name: "Inactive",
      status: "inactive",
      class: "",
    },
  ];

  if (req.query.status) {
    const index = filterStatus.findIndex(
      (item) => item.status == req.query.status
    );
    filterStatus[index].class = "active";
  } else {
    const index = filterStatus.findIndex(
        (item) => item.status == ""
      );
    filterStatus[index].class = "active";
  }

  let find = {
    deleted: false,
  };
  if (req.query.status) find.status = req.query.status;

  const products = await Product.find(find);

  res.render("admin/pages/products/index", {
    pageTitle: "danh sach san pham",
    products: products,
    filterStatus: filterStatus,
  });
};
