const router = require('express').Router()
const orderController = require('../controllers/orderController')

router.post('/create',orderController.addOrder)
router.get('/active', orderController.getActiveOrders); 
router.get('/noactive', orderController.getNoactiveOrders); 
router.get('/information/:id', orderController.information); 
router.get('/product/:id', orderController.information_product); 
router.put('/make_active/:id', orderController.makeOrderActive); 
router.put('/make_noactive/:id', orderController.makeOrderNoactive); 
router.put('/make_seen/:id', orderController.makeSeenOrder); 
router.put('/make_unseen/:id', orderController.makeUnseenOrder); 
router.delete('/:id', orderController.deleteOrder); 
router.delete('/delete/:id', orderController.deleteOrderUserSide); 










module.exports = router;

