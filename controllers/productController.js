const Comments = require('../models/Comment')
const Product = require('../models/Products')
const Category = require('../models/Category')
const Basket = require('../models/Basket')
const Comment = require('../models/Comment')
const Rating = require('../models/Rating')
const Order = require('../models/Order')
const Chegirma = require('../models/Chegirma')
const Color = require('../models/Color')
const Slider = require('../models/Slider')
const fs = require('fs');
const path = require('path')
const sharp = require('sharp')
const multer = require('multer')
exports.addProduct=async (req,res)=>{
    try{
        const files = req.files;
        let urls = [];
        let thumb=[]
        let orginal=`/public/uploads/org/${files[0].filename}`
        for(let i = 1; i < files.length; i++){
            const {filename} = files[i];
            await sharp(path.join(path.dirname(__dirname) + `/public/uploads/org/${filename}`) ).resize(450,600)
             .jpeg({
                    quality: 60
                })
                .toFile(path.join(path.dirname(__dirname) + `/public/uploads/thumb/${filename}`), (err)=>{
                    if(err) {
                        throw err
                    }
                    
                    fs.unlink(path.join(path.dirname(__dirname) + `/public/uploads/org/${filename}`), async () => {[]})
                })
            urls.push({
                url:`/public/uploads/thumb/${filename}`
            })
        }
    
    
     
        const product = new Product({
            name: {
                uz: req.body.nameuz,
                ru: req.body.nameru,
            },
            poster: orginal,
            size :req.body.size,
            colorID :req.body.colorID,
            categoryID: req.body.categoryID,
            tag: req.body.tag,
            description: {
                uz: req.body.desciriptionuz,
                ru: req.body.desciriptionru,
            },
            
            images: urls,
            price: req.body.price
        });
       await product.save()
            .then(() => {
                res.redirect('/api/product/all')
            })
           .catch((error)=> {
            res.status(400).json({message: "Data is not created", data: error})
           })
    }catch(error) {
        res.status(500).redirect('/product')
    }
}


exports.getProduct=async (req,res)=>{
    const category = await Category.find()
    const color = await Color.find()
    const product= await Product.find()
    .populate(['categoryID', 'colorID'])
     .sort({date:-1})
    const user = req.session.admin; // admin session
    res.render('./admin/product/index', {
        layout:'./admin_layout' ,
        product,
        user,
        category,
        color
    })
}


//UI statistikasi
exports.getByUserUIProduct=async (req,res)=>{
    const category  = await Category.find()
    const newsProduct= await Product.find()
    .populate(['categoryID', 'colorID'])
    .sort({date:-1})
    .limit(12)
    const bestProduct= await Product.find()
    .populate(['categoryID', 'colorID'])
    .sort({price:-1})
    .limit(12)
    const chegirmaProduct= await Product.find({chegirma:{$gt:0}})
    .populate(['categoryID', 'colorID'])
    .sort({price:1})
    .limit(12)
    const sliders = await Slider.find()
    .sort({date:-1})
    .limit(3)
    res.render('./client/index', {
        layout:'./client' ,
        title: "Hamroh",
        newsProduct,
        bestProduct,
        chegirmaProduct,
        sliders,
        category
    })
    //res.json(chegirmaProduct)
    
}


//Categoryasi buyicha olish
exports.getByUserCategoryIDProduct=async (req,res)=>{
    const category  = await Category.find()
    const product= await Product.find({categoryID: req.params.id})
    .populate(['categoryID', 'colorID'])
     .sort({date:-1})
     const user = req.session.user;
    res.render("./client/category", {title: "Hamroh", layout: "./client", category ,  product, user, lang: req.session.ulang  })
}

//images uchun
exports.getByUserImagesIDProduct=async (req,res)=>{
    const product= await Product.findById({_id: req.params.id})
    res.json(product)
}

//Bitta productni olish
exports.getUserByIDProduct=async (req,res)=>{
    const category  = await Category.find()
    
    const product= await Product.findById({_id: req.params.id})
     .populate(['categoryID', 'colorID'])
     const commentAll = await Comments.find({productID: product._id})
     .sort({createdAt: -1})
     .populate(['userID', 'productID'])
    const products= await Product.find({categoryID:product.categoryID})
    .populate(['categoryID', 'colorID'])
    .limit(4)
    const productss= await Product.find()
    .populate(['categoryID', 'colorID'])
    .skip(5)
    .sort({date:-1})
    const user = req.session.user;
    res.render("./client/product_window", {title: "Hamroh", layout: "./client", category,   product, products,productss, user,commentAll, lang: req.session.ulang })
}

//Zakaz berish
exports.getChekoutByIDProduct = async (req,res)=>{
    const category  = await Category.find()
    const product= await Product.findById({_id: req.params.id})
    .populate(['categoryID', 'colorID'])
    .sort({date:-1})
    const user = req.session.user;
    res.render("./client/checkout", {title: "Hamroh", layout: "./client",    product, user, category, lang: req.session.ulang })
}



exports.getById=async (req,res)=>{
    const product = await Product.findById(req.params.id)
    const category = await Category.find()
    const color = await Color.find()
    const user = req.session.admin; // admin session
    res.render('./admin/product/update', {
        layout: "./admin_layout", 
        product,
        user,
        category,
        color
    })
}
exports.updateProduct = async(req, res) => {

    const product = await Product.findByIdAndUpdate(req.params.id)
    product.price = req.body.price
    // product.size = req.body.size
    product.name.ru=req.body.nameru
    product.name.uz=req.body.nameuz
    product.categoryID= req.body.categoryID
    // product.colorID= req.body.colorID
    product.description.uz=req.body.descriptionuz
    product.description.ru=req.body.descriptionru
    product.save({validateBeforeSave:false})
        .then(()=>{
            res.redirect('/api/product/all')
        })
        .catch((err)=>{
            res.status(400).json({message: "Badly", data: error})
        })
}

exports.deleteFilePoster = async (req, res) => {
    await Product.findById({ _id: req.params.id })
        .exec(async (error, data) => {
            if (error) {
                res.send(error)
            }
            else { 
                // RASMLARNI ochirish uchun ishlatiladi
                const isMatch = data.images
                const thumb = data.poster
                let fileOriginalFirstElelement = path.join(path.dirname(__dirname) + `${thumb}`)
                for (let i = 0; i < isMatch.length; i++) {
                    let fileOriginal = path.join(path.dirname(__dirname) + `${isMatch[i].url}`)
                    fs.unlink(fileOriginal, async () => {[]})
                }
                fs.unlink(fileOriginalFirstElelement, (error) => {[]})
                const product_ID = data._id 
                // // PRODUCTGA OID BASKETNI OCHIRISH
                await Basket.deleteMany({productID : product_ID }).exec(() => {
                    console.log("Basketlarri hammasi o'chdi")
                })
                // // PRODUCTGA OID ORDERLARNI OCHIRISH
                await Order.deleteMany({productID : product_ID }).exec(() =>{
                    console.log("Orderlarni  hammasi o'chdi")
                })
                // // PRODUCTGA OID CHEGIRMALARNI OCHIRISH
                await Chegirma.deleteMany({product_ID : req.params.id }).exec(() =>{
                    console.log("Chegirmalarni  hammasi o'chdi")
                })
                // PRODUCTGA OID RATINGlARNI OCHIRISH
                await Rating.deleteMany({product :  product_ID}).exec(() =>{
                    console.log("Ratinglar  hammasi o'chdi")
                })
                // PRODUCTGA OID Komentariyalarni OCHIRISH
                await Comment.deleteMany({productID :  product_ID}).exec(() =>{
                    console.log("Komentariyalar  hammasi o'chdi")
                })
                // PRODUCTNI OCHIRISH
                await Product.findByIdAndDelete({ _id: req.params.id }).exec(() =>{
                    console.log("Mahsulot o'chdi")
                })
                res.redirect('/api/product/all')

            }
        })
}
