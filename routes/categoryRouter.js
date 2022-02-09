const express = require('express');
const router = express.Router();
const {addCategory,
    getCategory,
    getById,
    updateCategory,
    deleteCategory,
    getByUserCategory
} = require('../controllers/categoryController')

router.post('/',addCategory);
router.get('/all',getCategory);
router.get('/user/all',getByUserCategory);
router.get('/:id',getById);
router.put('/:id',updateCategory)
router.delete('/:id', deleteCategory)
module.exports = router