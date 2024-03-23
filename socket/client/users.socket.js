const User = require("../../models/user.model");
module.exports = (res) => {
  // get user_id from middleware
  _io.once("connection", (socket) => {
    socket.on("CLIENT_ADD_FRIEND", async (userId) => {
      const myUserId = res.locals.user.id;
      //myUserId=A    userId=B

      //Add id acceptFriends to userId
      const existAinB = await User.findOne({
        _id: userId,
        acceptFriends: myUserId,
      });
      if (!existAinB) {
        await User.updateOne(
          {
            _id: userId,
          },
          {
            $push: { acceptFriends: myUserId },
          }
        );
      }

      //Add id requestFriends to myUserId
      const existBinA = await User.findOne({
        _id: myUserId,
        requestFriends: userId,
      });
      if (!existBinA) {
        await User.updateOne(
          {
            _id: myUserId,
          },
          {
            $push: { requestFriends: userId },
          }
        );
      }
    });
  });
};
