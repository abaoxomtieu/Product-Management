// Alert update messages
const alertCell = document.querySelector("[show-alert]");
const closeButton = document.querySelector("[close-alert]");
if (alertCell) {
  const time = parseInt(alertCell.getAttribute("data-time"));
  setTimeout(() => {
    alertCell.classList.add("alert-hidden");
  }, time);

  closeButton.addEventListener("click", () => {
    alertCell.classList.add("alert-hidden");
  });
}