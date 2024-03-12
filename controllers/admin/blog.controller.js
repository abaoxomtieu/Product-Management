const Blog = require("../../models/blog.model");
const createTreeHelper = require("../../helpers/createTree");
const ProductCategory = require("../../models/product-category.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const systemConfig = require("../../config/system");
const paginationHelper = require("../../helpers/pagination");

// GET  /admin/blogs

module.exports.index = async (req, res) => {
  filterStatus = filterStatusHelper(req.query);
  let find = {
    deleted: false,
  };
  if (req.query.status) {
    find.status = req.query.status;
  }
  // Search bar
  const objectSearch = searchHelper(req.query);
  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }
  //End search
  countBlogs = await Blog.countDocuments(find);

  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 4,
    },
    req.query,
    countBlogs
  );
  //Find name of category
  const blogs = await Blog.find(find)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip)
  for (const blog of blogs) {
    const titleCartegory = await ProductCategory.findOne({
      _id: blog.parent_id,
    });
    if (titleCartegory) {
      blog.category = titleCartegory.title;
    }
  }
  //End find name of category

  // console.log(blogs);

  res.render("admin/pages/blogs/index", {
    pageTitle: "Trang bài Blog",
    filterStatus: filterStatus,
    blogs: blogs,
    pagination: objectPagination,
    keyword: objectSearch.keyword,
  });
};

// GET  /admin/blogs/created

module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };

  const records = await ProductCategory.find(find);

  const newRecords = createTreeHelper.tree(records);

  res.render("admin/pages/blogs/create", {
    pageTitle: "Tạo danh mục sản phẩm",
    records: newRecords,
  });
};
// POST /create

module.exports.createPOST = async (req, res) => {
  console.log("da qua day");
  console.log(req.body);

  console.log(req.file);
  if (req.body.position == "") {
    const countBlog = await Blog.countDocuments({});
    req.body.position = countBlog + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  req.body.createdBy = { account_id: res.locals.user.id };

  console.log(req.body);

  const blog = new Blog(req.body);
  await blog.save();
  res.redirect(`${systemConfig.prefixAdmin}/blogs`);
};
