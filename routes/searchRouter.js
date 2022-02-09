const express = require('express');
const router = express.Router()
const search = require('../controllers/searchController')

router.get('/admin', search.searchAdmin)
router.get('/client', search.searchClient)



module.exports = router 