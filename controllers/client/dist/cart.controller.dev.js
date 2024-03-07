"use strict";

var Cart = require("../../models/cart.model");

var Product = require("../../models/product.model");

var productsHelper = require("../../helpers/products"); //GET /cart/


module.exports.index = function _callee(req, res) {
  var cartId, cart, array, total, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, productId, productInfo;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          cartId = req.cookies.cartId;
          _context.next = 3;
          return regeneratorRuntime.awrap(Cart.findOne({
            _id: cartId
          }));

        case 3:
          cart = _context.sent;
          // console.log(cart.products);
          array = [];
          total = 0;

          if (!(cart.products.length > 0)) {
            _context.next = 40;
            break;
          }

          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 10;
          _iterator = cart.products[Symbol.iterator]();

        case 12:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 26;
            break;
          }

          item = _step.value;
          productId = item.product_id;
          _context.next = 17;
          return regeneratorRuntime.awrap(Product.findOne({
            _id: productId
          }).select("title thumbnail slug price discountPercentage"));

        case 17:
          productInfo = _context.sent;
          productInfo.quantity = item.quantity;
          productInfo.priceNew = productsHelper.priceNewProduct(productInfo);
          productInfo.total = productInfo.quantity * productInfo.priceNew;
          array.push(productInfo);
          total += productInfo.total;

        case 23:
          _iteratorNormalCompletion = true;
          _context.next = 12;
          break;

        case 26:
          _context.next = 32;
          break;

        case 28:
          _context.prev = 28;
          _context.t0 = _context["catch"](10);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 32:
          _context.prev = 32;
          _context.prev = 33;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 35:
          _context.prev = 35;

          if (!_didIteratorError) {
            _context.next = 38;
            break;
          }

          throw _iteratorError;

        case 38:
          return _context.finish(35);

        case 39:
          return _context.finish(32);

        case 40:
          res.render("client/pages/cart/index", {
            pageTitle: "Giỏ hàng",
            products: array,
            total: total
          });

        case 41:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[10, 28, 32, 40], [33,, 35, 39]]);
}; //POST /cart/add/:productId


module.exports.addPost = function _callee2(req, res) {
  var productId, quantity, cartId, cart, existProductCart, quantityNew, objectCart;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          productId = req.params.productId;
          quantity = parseInt(req.body.quantity);
          cartId = req.cookies.cartId;
          _context2.next = 5;
          return regeneratorRuntime.awrap(Cart.findOne({
            _id: cartId
          }));

        case 5:
          cart = _context2.sent;
          // find use fo js
          existProductCart = cart.products.find(function (item) {
            return item.product_id == productId;
          });
          console.log(existProductCart);

          if (!existProductCart) {
            _context2.next = 14;
            break;
          }

          quantityNew = existProductCart.quantity + quantity; // use this to set again value of an object in array

          _context2.next = 12;
          return regeneratorRuntime.awrap(Cart.updateOne({
            _id: cartId,
            "products.product_id": productId
          }, {
            $set: {
              "products.$.quantity": quantityNew
            }
          }));

        case 12:
          _context2.next = 17;
          break;

        case 14:
          objectCart = {
            product_id: productId,
            quantity: quantity
          };
          _context2.next = 17;
          return regeneratorRuntime.awrap(Cart.updateOne({
            _id: cartId
          }, {
            $push: {
              products: objectCart
            }
          }));

        case 17:
          req.flash("success", "Đã thêm sản phẩm vào giỏ hàng");
          res.redirect("back");

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  });
}; //GET /cart/delete/:id


module.exports["delete"] = function _callee3(req, res) {
  var productId, cartId;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          productId = req.params.id;
          cartId = req.cookies.cartId;
          _context3.next = 4;
          return regeneratorRuntime.awrap(Cart.updateOne({
            _id: cartId
          }, {
            $pull: {
              products: {
                product_id: productId
              }
            }
          }));

        case 4:
          req.flash("success", "Sản phẩm đã được xóa khỏi giỏ hàng");
          res.redirect("back");

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
};