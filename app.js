const express = require("express")
const app = express()
const path  = require("path")
const flash = require('connect-flash');
var passport = require('passport');
var expressSession = require('express-session');
const paypal = require('paypal-rest-sdk');
const route = require("./routes")
const port = 5000

require("./middleware/passportMiddleware")(passport)

// paypal
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'Ac38wqpxPDTskmmSveAoWrNUfuReKycyDauIyaKkf8PrQLYOSb0SLb-OtqfxjD-kIOxU4o7JhTRSI5bE',
    'client_secret': 'EFXFTDdGYRyNB2L7EKu5anJReSlxJUAFPz8LsmwJvEruoiJrEV3rkHoWVBLDYt8g3p7t_vKKJNRfiB30'
  });
  

//ejs
app.set("view engine", "ejs")
app.set("views", "./views")

// body-parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// static
app.use('/static', express.static(path.join(__dirname, 'public')))

// mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://chuongnguyen:OmC5Kd2PYuqCJKm6@cluster0.ae7vk.mongodb.net/PTTKHTTT?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    function (err) {
        if (!err) {
            console.log("connect Mongo")
            app.listen(port, () => {
                console.log(`sever runing on ${port}`);
            })
        } else {
            console.log("not connect " + err)
        }
    });
// express-session
app.use(expressSession({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  }))
app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
  });
// passport
app.use(passport.initialize());
app.use(passport.session());

//flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });
  
// route init
route(app)



