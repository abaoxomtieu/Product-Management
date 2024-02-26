const dashboardRoutes = require("./dashboard.route");
const productRoutes = require("./product.route");


const systemConfig = require("../../config/system");
module.exports = (app) => {
  PATH_ADMIN = systemConfig.prefixAdmin;

  app.use(PATH_ADMIN + "/dashboard", dashboardRoutes);
  app.use(PATH_ADMIN + "/products", productRoutes);
};
