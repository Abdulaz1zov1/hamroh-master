const router = require('express').Router()
const md5 = require('md5')
const multer = require('multer');
const {
    addProduct,
    getById,
    getProduct,
    updateProduct,
    deleteFilePoster,
    getByUserImagesIDProduct
    } = require('../controllers/productController');
const path = require('path')



const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null, './public/uploads/org');
    }, 
    filename: function (req,file,cb) {
        cb(null, `${md5(Date.now())}${path.extname(file.originalname)}`);
    }
});


const upload = multer({storage: storage});

router.post('/', upload.array('images',12), addProduct);
router.get('/all', getProduct);
router.get('/:id', getById);
router.delete('/:id',deleteFilePoster);
router.put('/:id',updateProduct)
router.get('/client/:id',getByUserImagesIDProduct)

module.exports = router;
