const items = require("./routers/items");
const categories = require('./routers/categories');

module.exports = function (app) {
  app.use('/items', items);
  app.use('/categories',categories );
}