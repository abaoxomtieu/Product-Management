const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");
//GET /cart/
module.exports.index = async (req, res) => {
  // get user_id from middleware
  const userId = res.locals.user.id;
  const fullName = res.locals.user.fullName;

  //SocketIO
  _io.once("connection", (socket) => {
    socket.on("CLIENT_SEND_MESSAGE", async (content) => {
      const chat = new Chat({
        user_id: userId,
        content: content,
      });
      await chat.save();
      //Return data to client
      _io.emit("SERVER_RETURN_MESSAGE", {
        userId: userId,
        fullName: fullName,
        content: content,
      });
    });
    //Typing
    socket.on("CLIENT_SEND_TYPING", (type) => {
      console.log(type);
      //broadcast use to return all but without sender
      socket.broadcast.emit("SEVER_RETURN_TYPING", {
        userId: userId,
        fullName: fullName,
        type: type,
      });
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
