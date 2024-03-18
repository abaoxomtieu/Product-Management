import * as Popper from "https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js";

// CLIENT SEND MESSAGE

const formSendData = document.querySelector(".inner-form");
if (formSendData) {
  formSendData.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    if (content) {
      socket.emit("CLIENT_SEND_MESSAGE", content);
      // reset input field after send
      e.target.content.value = "";
      // clear typing when message sent
      socket.emit("CLIENT_SEND_TYPING", "hidden");
    }
  });
}
// SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
  const myId = document.querySelector("[my-id]").getAttribute("my-id");
  const body = document.querySelector(".inner-body");
  const div = document.createElement("div");
  const boxTyping = document.querySelector(".inner-list-typing");
  div.classList.add(data.userId == myId ? "inner-outgoing" : "inner-incoming");
  let htmlFullName = "";

  if (data.userId == myId) {
    div.classList.add("inner-outgoing");
  } else {
    htmlFullName = `<div class="inner-name">${data.fullName}</div>`;
    div.classList.add("inner-incoming");
  }
  div.innerHTML = `
        ${htmlFullName}
        <div class="inner-content">${data.content}</div>
        `;
  // Insert before boxTyping
  body.insertBefore(div, boxTyping);
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
if (buttonIcon) {
  const tooltip = document.querySelector(".tooltip");
  Popper.createPopper(buttonIcon, tooltip);

  buttonIcon.onclick = () => {
    tooltip.classList.toggle("shown");
  };
}
//End show popup

//Show typing
var timeOut;
const showTyping = () => {
  socket.emit("CLIENT_SEND_TYPING", "show");
  clearTimeout(timeOut);

  timeOut = setTimeout(() => {
    socket.emit("CLIENT_SEND_TYPING", "hidden");
  }, 3000);
};
//End show typing

//Inser icon to input
const emojiPicker = document.querySelector("emoji-picker");
if (emojiPicker) {
  const input = document.querySelector(
    ".chat .inner-form input[name='content']"
  );
  emojiPicker.addEventListener("emoji-click", (event) => {
    const icon = event.detail.unicode;
    input.value = input.value + icon;
    const end = input.value.length
     //move cursor to end of input
    input.setSelectionRange(end, end);
    input.focus();

    showTyping();
  });

  // Input Keyup
  input.addEventListener("keyup", () => {
    showTyping();
  });

  //End Input Keyup
}
//End insert icon to input

//End Emoji picker icon chat

// SEVER_RETURN_TYPING
const elementListTyping = document.querySelector(".chat .inner-list-typing");
if (elementListTyping) {
  socket.on("SEVER_RETURN_TYPING", (data) => {
    if (data.type == "show") {
      const existTyping = elementListTyping.querySelector(
        `[user-id='${data.userId}']`
      );
      if (!existTyping) {
        const boxTyping = document.createElement("div");
        boxTyping.classList.add("box-typing");
        boxTyping.setAttribute("user-id", data.userId);

        boxTyping.innerHTML = `
            <div class="inner-name">${data.fullName}</div>
            <div class="inner-dots">
              <span></span> 
              <span></span>  
              <span></span> 
            </div>`;
        elementListTyping.appendChild(boxTyping);
        scrollChatToBottom();
      }
    } else {
      const boxTypingRemove = elementListTyping.querySelector(
        `[user-id='${data.userId}']`
      );
      if (boxTypingRemove) {
        elementListTyping.removeChild(boxTypingRemove);
      }
    }
  });
}
