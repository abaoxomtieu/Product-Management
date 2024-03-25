// Send add friend request
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]");
if (listBtnAddFriend.length > 0) {
  listBtnAddFriend.forEach((button) => {
    button.addEventListener("click", () => {
      const boxUser = button.closest(".box-user").classList.add("add");
      const userId = button.getAttribute("btn-add-friend");
      socket.emit("CLIENT_ADD_FRIEND", userId);
    });
  });
}
// End add friend request

// Cancel add friend request
const listBtnCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
if (listBtnCancelFriend.length > 0) {
  listBtnCancelFriend.forEach((button) => {
    button.addEventListener("click", () => {
      const boxUser = button.closest(".box-user").classList.remove("add");
      const userId = button.getAttribute("btn-cancel-friend");
      socket.emit("CLIENT_CANCEL_FRIEND", userId);
    });
  });
}
// End cancel add friend request

// Refuse accept friend request
const refuseFriend = (button) => {
  button.addEventListener("click", () => {
    button.closest(".box-user").classList.add("refuse");
    const userId = button.getAttribute("btn-refuse-friend");
    socket.emit("CLIENT_REFUSE_FRIEND", userId);
  });
};
const listBtnRefuselFriend = document.querySelectorAll("[btn-refuse-friend]");
if (listBtnRefuselFriend.length > 0) {
  listBtnRefuselFriend.forEach((button) => {
    refuseFriend(button);
  });
}
// End Refuse accept friend request

// Accept friend request
const acceptFriend = (button) => {
  button.addEventListener("click", () => {
    button.closest(".box-user").classList.add("accepted");
    const userId = button.getAttribute("btn-accept-friend");
    socket.emit("CLIENT_ACCEPT_FRIEND", userId);
  });
};
const listBtnAcceptFriend = document.querySelectorAll("[btn-accept-friend]");
if (listBtnAcceptFriend.length > 0) {
  listBtnAcceptFriend.forEach((button) => {
    acceptFriend(button);
  });
}
// End Accept friend request

// SEVER_RETURN_ACCEPT__FRIEND_LENGTH
const badgeUserAccept = document.querySelector("[badge-users-accept]");
if (badgeUserAccept) {
  const userId = badgeUserAccept.getAttribute("badge-users-accept");
  socket.on("SEVER_RETURN_ACCEPT_FRIEND_LENGTH", (data) => {
    if (userId == data.userId) {
      badgeUserAccept.innerHTML = data.lengthAcceptFriends;
    }
  });
}

//End SEVER_RETURN_ACCEPT__FRIEND_LENGTH

// SERVER_RETURN_INFO_ACCEPT_FRIEND
const dataUserAccept = document.querySelector("[data-users-accept]");
if (dataUserAccept) {
  const userId = dataUserAccept.getAttribute("data-users-accept");
  socket.on("SERVER_RETURN_INFO_ACCEPT_FRIEND", (data) => {
    if (userId == data.userId) {
      const div = document.createElement("div");
      div.classList.add("col-6");
      div.innerHTML = `
        <div class="box-user">
          <div class="inner-avatar">
            <img src="https://th.bing.com/th/id/R.763b4716501cc74b2972101f15c83cee?rik=8oDmobMGCFpMFA&amp;pid=ImgRaw&amp;r=0" alt="${data.infoUserA.fullName}">
          </div>
          <div class="inner-info">
            <div class="inner-name">
              ${data.infoUserA.fullName}
            </div>
            <div class="inner-buttons">
              <button class="btn btn-sm btn-primary mr-1" btn-accept-friend="${data.infoUserA._id}">Chấp nhận</button>
              <button class="btn btn-sm btn-secondary mr-1" btn-refuse-friend="${data.infoUserA._id}">Xóa</button>
              <button class="btn btn-sm btn-secondary mr-1" btn-deleted-friend="" disabled="">Đã xóa</button>
              <button class="btn btn-sm btn-secondary mr-1" btn-accepted-friend="" disabled="">Đã chấp nhận</button>
            </div>
          </div>
        </div>
      
      `;
      dataUserAccept.appendChild(div);
      // Show data to userID

      // Cancel acceptFriends
      const buttonRefuse = div.querySelector("[btn-refuse-friend]");
      refuseFriend(buttonRefuse);
      // End Cancel acceptFriends

      //Accept friend
      const buttonAccept = div.querySelector("[btn-accept-friend]");
      acceptFriend(buttonAccept)
      //End Accept friend
    }
  });
}

//End SERVER_RETURN_INFO_ACCEPT_FRIEND
