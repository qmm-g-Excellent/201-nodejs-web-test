const {Router} = require("express");
const ItemController = require("../../controller/item-controller");

const router = Router();
const itemCtrl = new ItemController();

router.get('/', itemCtrl.getAll);
router.get('/:itemId' , itemCtrl.getOne);
router.post('/', itemCtrl.create);
router.put('/:itemId', itemCtrl.update);
router.delete('/:itemId', itemCtrl.delete);

module.exports = router;