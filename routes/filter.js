const express = require('express')
const router= express.Router()
const md5 = require('md5')
const multer = require('multer');
const {
    getByUserCategoryIDProduct,
    getByUserUIProduct
    } = require('../controllers/productController');


router.get('/filter/:id', getByUserCategoryIDProduct);
router.get('/', getByUserUIProduct);

module.exports = router;
