const express = require('express');
const router = express.Router();
const {addComment,
    getComment,
    getById,
    updateComment,
    deleteComment,
    getByProductID,
    getByUserID} = require('../controllers/commentController')

router.post('/',addComment);

router.get('/all',getComment);
router.get('/all/:id',getById);
router.put('/edit/:id',updateComment)
router.get('/byproduct/:productID',getByProductID)
router.get('/byuser/:userID',getByUserID)
router.delete('/delete/:id', deleteComment)
module.exports = router 