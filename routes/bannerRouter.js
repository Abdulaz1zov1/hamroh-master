const express = require('express');
const router = express.Router()
const banner = require('../controllers/bannerController')
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
 
router.post('/add',upload.single('image'), banner.createOne)
router.get('/all',banner.getAll)
router.delete('/:id',banner.deleteOne)



module.exports = router