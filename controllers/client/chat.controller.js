//GET /cart/
module.exports.index = async (req, res) => {
  //SocketIO
  _io.on("connection", (socket) => {
    console.log("a user connected");
  });
  //End SocketIO
  res.render("client/pages/chat/index", {
    pageTitle: "Chat",
  });
};
