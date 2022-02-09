const express = require('express');
const router = express.Router()
const slider= require('../controllers/sliderController')
const multer = require('multer')
const md5 = require('md5')
const path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/uploads");  
    },
    filename: function (req, file, cb) {
      cb(null, `${md5(Date.now())}${path.extname(file.originalname)}`);
    },
  });
  const upload = multer({ storage: storage });
 
router.post('/add',  upload.single('image'), slider.createOne)
router.get('/all', slider.getAll)
router.get('/client', slider.get_slider_CLIENT)
router.get('/:id', slider.getOne)
router.put('/:id',  upload.single('image'), slider.updateOne)
router.delete('/:id',  slider.deleteOne)



module.exports = router