const { 
    newCategory, 
    getAllCategories, 
    oneCategory, 
    getAllCategoriesByRestaurant } = require('../controllers/categoryController');
const router = require('express').Router();


router.route('/create-category').post(newCategory);
router.route('/all-categories').get(getAllCategories);
router.route('/category/:id').get(oneCategory);
router.route('/:catId/category-specific/:id').get(getAllCategoriesByRestaurant);


module.exports = router