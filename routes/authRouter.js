const express = require('express');
const router = express.Router();
const admin = require('../controllers/authController')

router.post('/super_admin', admin.super_admin)
router.post('/login', admin.login)
router.get('/logout', admin.logout)
router.get('/:id', admin.getOne)
router.put('/:id', admin.updateOne)
  

module.exports = router