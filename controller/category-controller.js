const Category = require("../model/category");
const Item = require("../model/item");
const async = require("async");
const constant = require("../config/constant");

class CategoryController {
  getAll(req, res, next) {
    async.series({
      items: (done)=> {
        Category.find({}, done);
      },
      totalCount: (done)=> {
        Category.count(done);
      }
    }, (err, doc)=> {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.OK);
    })
  }

  getOne(req, res, next) {
    const categoryId = req.params.categoryId;
    Category.findById(categoryId, (err, doc)=> {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      res.status(constant.httpCode.OK).send(doc);
    })
  }

  create(req, res, next) {
    Category.create(req.body, (err, doc)=> {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.CREATED).send({uri: `categories/${doc._id}`});
    })
  }

  delete(req, res, next) {
    const category = req.params.categoryId;
    async.waterfall([
      (done)=> {
        Item.findOne({category}, done);
      },
      (doc, done)=> {
        if (doc) {
          return done(true, null);
        }
        Category.findByIdAndRemove(category, (err, doc)=> {
          if (!doc) {
            return done(false, null);
          }
          done(err, doc);
        })
      }
    ], (err)=> {
      if (err === true) {
        return res.sendStatus(constant.httpCode.BAD_REQUEST);
      }
      if (err === false) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      res.sendStatus(constant.httpCode.NO_CONTENT);
    })
  }

  update(req, res, next) {
    const categoryId = req.params.categoryId;
    Category.findByIdAndUpdate(categoryId, (err, doc)=> {
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

module.exports = CategoryController;