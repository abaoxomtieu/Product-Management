const dashboardRoutes = require("./dashboard.route");
const productRoutes = require("./product.route");
const productCategoryRoutes = require("./product-category.route");
const roleRoutes = require("./role.route");
const accountRoutes = require("./account.route");
const authRoutes = require("./auth.route")





const systemConfig = require("../../config/system");
module.exports = (app) => {
  PATH_ADMIN = systemConfig.prefixAdmin;

  app.use(PATH_ADMIN + "/dashboard", dashboardRoutes);
  app.use(PATH_ADMIN + "/products", productRoutes);
  app.use(PATH_ADMIN + "/products-category", productCategoryRoutes);
  app.use(PATH_ADMIN + "/roles", roleRoutes);
  app.use(PATH_ADMIN + "/accounts", accountRoutes);
  app.use(PATH_ADMIN + "/auth", authRoutes);



};
