//GET /cart/
module.exports.index = async (req, res) => {
  res.render("client/pages/chat/index", {
    pageTitle: "Chat",
  });
};
