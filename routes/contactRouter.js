const express = require('express');
const router = express.Router()
const {
createOne,
Unseen,
Seen,
Info,
makeSeen,
deleteOne,
} = require('../controllers/contactController')

router.post('/add', createOne)
router.get('/unseen',Unseen)
router.get('/seen',Seen)
router.get('/:id',Info)
router.put('/:id',makeSeen)
router.delete('/:id',deleteOne)


module.exports = router 