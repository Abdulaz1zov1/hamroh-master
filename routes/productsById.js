const express = require('express')
const router= express.Router()
const md5 = require('md5')
const multer = require('multer');
const {
    getUserByIDProduct,
    getChekoutByIDProduct
    } = require('../controllers/productController');


router.get('/:id', getUserByIDProduct);
router.get('/order/:id', getChekoutByIDProduct);

module.exports = router;
