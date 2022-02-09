const express = require('express');
const router = express.Router();
const client = require('../../controllers/client/index')

router.get('/', client.index)
router.get('/about', client.about)
router.get('/contact', client.contact)
router.get('/profil', client.profil)
router.get('/delivery', client.delivery)
router.get('/location', client.location)
router.get('/basket', client.basket)
router.get('/:id', client.filter_category)
router.get('/get_one_product/:id', client.get_one_product)




module.exports = router

