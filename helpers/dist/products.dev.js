"use strict";

module.exports.priceNewProducts = function (products) {
  var newProducts = products.map(function (item) {
    item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(0);
    return item;
  });
  return newProducts;
};

module.exports.priceNewProduct = function (item) {
  var priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(0);
  return parseInt(priceNew);
};