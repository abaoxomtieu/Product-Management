const Role = require("../../models/role.model");
const systemConfig = require("../../config/system");

// GET  /admin/roles
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Role.find(find);

  res.render("admin/pages/roles/index", {
    pageTitle: "Page Roles",
    records: records,
  });
};

// GET  /admin/roles/create

module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Role.find(find);

  res.render("admin/pages/roles/create", {
    pageTitle: "Create role",
    records: records,
  });
};

// POST  /admin/roles/create

module.exports.createPost = async (req, res) => {
  console.log(req.body);
  const record = new Role(req.body);
  await record.save();
  res.redirect(`${systemConfig.prefixAdmin}/roles`);
};

// GET  /admin/roles/detail:id

// module.exports.detail = async (req, res) => {
//     try {
//       const id = req.params.id;
//       let find = {
//         _id: id,
//         deleted: false,
//       };

//       record = await Role.findOne(find);
//       res.render("admin/pages/roles/detail", {
//         pageTitle: product.title,
//         product: record,
//       });
//     } catch (error) {
//       res.redirect(`${systemConfig.prefixAdmin}/roles`);
//     }
//   };

// GET  /admin/roles/edit/:id

module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    let find = {
      _id: id,
      deleted: false,
    };

    data = await Role.findOne(find);
    res.render("admin/pages/roles/edit", {
      data: data,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  }
};
// PATCH /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    console.log(req.body);
    await Role.updateOne(req.body);
    req.flash("success", "Role has been updated");
    res.redirect("back");
  } catch (error) {
    req.flash("error", "Role failed to update");
  }
};

// GET  /admin/roles/permissions

module.exports.permissions = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Role.find(find);

  res.render("admin/pages/roles/permissions", {
    pageTitle: "permissions role",
    records: records,
  });
};

// PATCH  /admin/roles/permissions

module.exports.permissionsPatch = async (req, res) => {
  const permissions = JSON.parse(req.body.permissions)
  console.log(permissions);
  for (const item of permissions) {
    await Role.updateOne({_id: item.id}, {permissions: item.permissions})
    
  }
  req.flash("success", "update permissions success")
  res.redirect('back')
};