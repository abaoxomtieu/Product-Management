const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");
//GET /cart/
module.exports.index = async (req, res) => {
  // get user_id from middleware
  const userId = res.locals.user.id;
  //SocketIO
  _io.once("connection", (socket) => {
    socket.on("CLIENT_SEND_MESSAGE", async (content) => {
      const chat = new Chat({
        user_id: userId,
        content: content,
      });
      await chat.save();
    });
  });
  //End SocketIO

  // Extract data from database
  const chats = await Chat.find({ deleted: false });
  for (const chat of chats) {
    const infoUser = await User.findOne({ _id: chat.user_id }).select(
      "fullName"
    );
    chat.infoUser = infoUser;
  }

  res.render("client/pages/chat/index", {
    pageTitle: "Chat",
    chats: chats,
  });
};