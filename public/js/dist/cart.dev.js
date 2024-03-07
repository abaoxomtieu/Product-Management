"use strict";

// Cập nhật số lương trong giỏ hàng
var inputsQuantity = document.querySelectorAll("input[name='quantity']");
console.log(inputsQuantity);

if (inputsQuantity.length > 0) {
  inputsQuantity.forEach(function (input) {
    input.addEventListener("change", function () {
      var productId = input.getAttribute("product-id");
      var quantity = input.value;
      window.location.href = "/cart/update/".concat(productId, "/").concat(quantity);
    });
  });
}