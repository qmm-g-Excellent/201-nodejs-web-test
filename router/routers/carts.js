const {Router} = require('express');
const CartController = require('../../controller/cart-controller');

const router = Router();
const cartController = new CartController();

router.get('/',cartController.getAll);
router.get('/:cartId',cartController.getOne);
router.post('/',cartController.create);
router.put('/:cartId',cartController.update);
router.delete('/:cartId',cartController.delete);

module.exports = router;