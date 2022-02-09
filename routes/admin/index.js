const express = require('express');
const router = express.Router()
const admin = require('../../controllers/admin/index')
const {isAuth} = require('../../middleware/auth')

router.get('/login', admin.login)
router.get('/dashboard', isAuth, admin.dashboard)
router.get('/noactive', admin.orders_noactive)
router.get('/active', admin.orders_active)

module.exports = router