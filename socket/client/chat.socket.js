const uploadToCloudinary = require("../../helpers/uploadToCloudinary");
const Chat = require("../../models/chat.model");

module.exports = (res) => {
  // get user_id from middleware
  const userId = res.locals.user.id;
  const fullName = res.locals.user.fullName;
  _io.once("connection", (socket) => {
    socket.on("CLIENT_SEND_MESSAGE", async (data) => {
      let images = [];
      for (const imageBuffer of data.images) {
        const link = await uploadToCloudinary(imageBuffer);
        images.push(link);
      }
      // console.log(images);

      // Save in database
      const chat = new Chat({
        user_id: userId,
        content: data.content,
        images: images,
      });
      await chat.save();

      //Return data to client
      _io.emit("SERVER_RETURN_MESSAGE", {
        userId: userId,
        fullName: fullName,
        content: data.content,
        images: images,
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
      //End Typing
    });
  });
};
