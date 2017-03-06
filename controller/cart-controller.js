const Cart = require("../model/cart");
const Item = require("../model/item");
const async = require("async");
const constant = require("../config/constant");


class CartController {
  getAll(req, res, next) {
    async.series({
      items: (done)=> {
        Cart.find({}, (err, docs)=> {
          const carts = docs.map((doc)=> {
            const cart = doc.toJSON();
            cart.items = cart.items.map((item)=> {
              return {uri: `carts/${item.item}`, count: item.count}
            });
            return cart;
          });
          done(err, carts);
        });
      },
      totalCount: (done)=> {
        Cart.count(done);
      }
    }, (err, doc)=> {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.OK).send(doc);
    })
  }

  getOne(req, res, next) {
    Cart.findById(req.params.cartId, (err, doc)=> {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.status(constant.httpCode.NOT_FOUND);
      }

      const cart = doc.toJSON();
      cart.items = cart.items.map((item)=> {
        return {uri: `carts/${item.item}`, count: item.count}
      });

      return res.status(constant.httpCode.OK).send(cart);
    })
  }

  create(req, res, next) {
    Cart.create(req.body, (err, doc)=> {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.NO_CONTENT).send({uri: `carts/${doc._id}`});
    });
  }

  delete(req, res, next) {
    Cart.findByIdAndRemove(req.params.cartId, (err, doc)=> {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      res.sendStatus(constant.httpCode.NO_CONTENT);

    })
  }

  update(req, res, next) {
    Cart.findByIdAndUpdate(req.params.cartId, (err, doc)=> {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      res.sendStatus(constant.httpCode.NO_CONTENT);

    })
  }
}

module.exports = CartController;