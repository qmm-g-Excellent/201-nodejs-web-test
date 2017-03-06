const {Router} = require('express');
const CategoryController = require('../../controller/category-controller');

const router = Router();
const categoryController = new CategoryController();


router.get('/', categoryController.getAll);
router.get('/:categoryId', categoryController.getOne);
router.post('/', categoryController.create);
router.delete('/:categoryId', categoryController.delete);
router.put('/:categoryId', categoryController.update);

module.exports = router;
