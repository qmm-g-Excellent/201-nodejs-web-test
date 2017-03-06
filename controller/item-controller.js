const Item = require("../model/item");
const async = require("async");
const constant = require("../config/constant");

class ItemController {
  getAll(req, res, next) {
    async.series({
      items: (done) => {
        Item.find({})
            .populate('category')
            .exec(done);
      },
      totalCount: (done) => {
        Item.count(done);
      }
    }, (err, result) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.OK).send(result);
    });
  }


  getOne(req, res, next) {
    Item.findById(req.params.itemId)
        .populate('category')
        .exec((err, doc)=> {
          if (err) {
            return next(err);
          }
          if (!doc) {
            return res.sendStatus(constant.httpCode.NOT_FOUND);
          }
          return res.status(constant.httpCode.OK).send(doc);

        })
  }

  create(req, res, next) {
    Item.create(req.body,(err, doc)=>{
      if(err){
       return next(err);
      }
      return res.status(constant.httpCode.CREATED).send({uri:`items/${doc._id}`})

    })
  }


  update(req, res, next){
    Item.findByIdAndUpdate(req.params.itemId, req.body,(err, doc)=>{
     if(err){
      return next(err);
     }
     if(!doc){
       return res.sendStatus(constant.httpCode.NOT_FOUND);
     }
     return res.sendStatus(constant.httpCode.NO_CONTENT);
    })
  }

  delete(req, res, next){
    Item.findByIdAndRemove(req.params.itemId,(err, doc)=>{
      if(err){
       return next(err);
      }
      if(!doc){
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      res.sendStatus(constant.httpCode.NO_CONTENT);

    })
  }

}

module.exports = ItemController;


