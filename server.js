const express = require('express')
const app = express()
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const pathdir = require('path').join(__dirname, '/public/uploads')
const expressLayouts = require('express-ejs-layouts');
const i18n = require("i18n-express");
const ejs = require('ejs');
const methodOverride = require("method-override");
// Setting

//G-5FP115VR2C
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
// const MongoURI = "mongodb+srv://admin:g5986173@cluster0.0vixc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const MongoURI = "mongodb://localhost:27017/hamrohsavdo"
  

mongoose.connect(MongoURI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log(`Mongodb is running`);
    });
const store = new MongoDBSession({
    uri: MongoURI,
    collection: "MYSession",
});

app.use(
    session({
        secret: "this_is_session_secret_key_07565434546",
        saveUninitialized: false,
        store: store,
        resave: false,

        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 30 * 12,  // 1 yil uchun
            sameSite: "strict",
        },
    })
);
app.use(i18n({
    translationsPath: path.join(__dirname, 'i18n'),
    siteLangs: ["uz", "ru"],
    textsVarName: 'translation'
}));


app.use(
    methodOverride("_method", {
        methods: ["POST", "GET"],
    })
);
app.locals.moment = require("moment");
app.use('/public/uploads', express.static(pathdir));
app.use(cookieParser());
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public/uploads'));
app.use('/uploads', express.static(__dirname + '/public/uploads'))




app.use('/', require('./routes/client/index'))
app.use('/admin', require('./routes/admin/index'))

 
app.use('/api/category', require('./routes/categoryRouter'))
app.use('/api/user', require('./routes/userRouter'));
app.use('/api/auth', require('./routes/authRouter'));
app.use('/api/product', require('./routes/productRouter'));
app.use('/api/order', require('./routes/orderRouter'));
app.use('/api/faq', require('./routes/faqRouter'));
app.use('/api/color', require('./routes/colorRouter'));
app.use('/api/contact', require('./routes/contactRouter'));
app.use('/api/slider', require('./routes/sliderRouter'));
app.use('/api/comment', require('./routes/commentRouter'));
app.use('/api/chegirma', require('./routes/chegirmaRouter'));
app.use('/api/search', require('./routes/searchRouter'));
app.use('/', require('./routes/filter'));
app.use('/product', require('./routes/productsById'));
app.use('/api/basket', require('./routes/basketRouter'));
app.use('/api/rating', require('./routes/ratingRouter'));
app.use('/api/lang', require('./routes/lang'));
app.use('/api/banner', require('./routes/bannerRouter'));


const PORT = process.env.PORT||3000
app.listen(PORT, () => {
    console.log(`${PORT} server running now`)
})