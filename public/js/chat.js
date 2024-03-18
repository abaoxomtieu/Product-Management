import * as Popper from "https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js";

// CLIENT SEND MESSAGE

const formSendData = document.querySelector(".inner-form");
if (formSendData) {
  formSendData.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    if (content) {
      socket.emit("CLIENT_SEND_MESSAGE", content);
      e.target.content.value = "";
    }
  });
}
// SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
  const myId = document.querySelector("[my-id]").getAttribute("my-id");
  const body = document.querySelector(".inner-body");
  const div = document.createElement("div");
  div.classList.add(data.userId == myId ? "inner-outgoing" : "inner-incoming");
  let htmlFullName = "";

  if (data.userId == myId) {
    div.classList.add("inner-outgoing");
  } else {
    htmlFullName = `<div class="inner-name">${data.fullName}</div>`;
    div.classList.add("inner-incoming");
  }
  // div.classList.add("inner-incoming")
  div.innerHTML = `
        ${htmlFullName}
        <div class="inner-content">${data.content}</div>
        `;
  body.appendChild(div);
  scrollChatToBottom();
});

//Scroll Chat to bottom function
function scrollChatToBottom() {
  const bodyChat = document.querySelector(".chat .inner-body");
  if (bodyChat) {
    bodyChat.scrollTop = bodyChat.scrollHeight;
  }
}
scrollChatToBottom();
// End Scroll Chat to bottom

//Emoji picker icon chat

//Show popup
const buttonIcon = document.querySelector(".button-icon");
console.log(buttonIcon);
if (buttonIcon) {
  const tooltip = document.querySelector(".tooltip");
  Popper.createPopper(buttonIcon, tooltip);

  buttonIcon.onclick = () => {
    tooltip.classList.toggle("shown");
  };
}
//End show popup

//Inser icon to input
const emojiPicker = document.querySelector("emoji-picker");
if (emojiPicker) {
  emojiPicker.addEventListener("emoji-click", (event) => {
    const icon = event.detail.unicode;
    const input = document.querySelector(
      ".chat .inner-form input[name='content']"
    );
    input.value = input.value + icon;
    
  });
}
//End insert icon to input

//End Emoji picker icon chat
