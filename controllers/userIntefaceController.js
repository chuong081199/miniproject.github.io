const paypal = require('paypal-rest-sdk');
const collections = require("../model/collection")
const categorys = require("../model/category")
const products = require("../model/product")
const Cart = require("../model/cart")
const oder = require("../model/order")
const blog = require("../model/blog")

class main {
    index(req, res) {
        products.find((err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.render("user/index", { data: data })
            }
        }).limit(3)

    }
    products(req, res) {
        categorys.find().populate({ path: "products", model: products }).exec((err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.render("user/products", { data: data })
            }
        })
    }
    product(req, res) {
        products.findById(req.params.id, (err, data) => {
            res.render("user/product", { data: data })
        })
    }
    about(req, res) {
        res.render("user/about")
    }
    contac(req, res) {
        res.render("user/contac")
    }
    blogs(req, res) {
        blog.find((err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.render("user/blogs", { data: data })
            }
        })
    }
    blog(req, res) {
        blog.findById(req.params.id, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.render("user/blog", { data: data })
            }
        })
    }
    addCart(req, res) {
        const producId = req.params.id
        const cart = new Cart(req.session.cart ? req.session.cart : {})

        products.findById(producId, (err, data) => {
            if (err) {
                return res.redirect("/products/")
            } else {
                cart.add(data, data._id)
                req.session.cart = cart
                res.redirect("/products")
                // res.json(cart)
            }
        })
    }
    cart(req, res) {
        if (!req.session.cart) {
            res.redirect("/products")
        }
        const cart = new Cart(req.session.cart)
        const arr = []
        for (var id in cart.items) {
            arr.push(cart.items[id])
        }
        // res.json(arr)
        res.render("user/cart", { data: arr, price: cart.Price })
    }
    checkOut(req, res) {
        if (!req.session.cart) {
            res.redirect("/products")
        }
        const cart = new Cart(req.session.cart)
        const arr = []
        for (var id in cart.items) {
            arr.push(cart.items[id])
        }
        // res.json(arr)
        res.render("user/checkOut", { data: arr, price: cart.Price })
    }
    postCheckOut(req, res) {
        const data = req.body
        const products = []
        const quantitys = []
        const prices = []

        if (Array.isArray(data.product)) {
            data.product.forEach((i) => {
                products.push(i)
            })
        } else {
            products.push(data.product)
        }
        if (Array.isArray(data.qty)) {
            data.qty.forEach((i) => {
                quantitys.push(i)
            })
        } else {
            quantitys.push(data.qty)
        }
        if (Array.isArray(data.price)) {
            data.price.forEach((i) => {
                prices.push(i)
            })
        } else {
            prices.push(data.price)
        }
        const Oder = new oder({
            name: data.name,
            phone: data.phone,
            add: data.address,
            products: products,
            quantity: quantitys,
            price: prices,
            check: false,
            pay: "thanh toán khi nhận hàng"
        })
        Oder.save((err) => {
            if (err) {
                console.log(err);
            } else {
                req.session.destroy((err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        req.session = null
                        res.redirect("/")
                    }
                })
            }
        })
    }
    postcheckPaypal(req, res) {
        const cart = new Cart(req.session.cart)
        const price = Math.round((cart.Price / 23041) * 100) / 100

        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:5000/success",
                "cancel_url": "http://localhost:5000/"
            },
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": price
                },
                "description": "Hat for the best team ever"
            }]
        }

        paypal.payment.create(create_payment_json, function (err, payment) {
            if (err) {
                res.render('cancle');
            } else {
                for (let i = 0; i < payment.links.length; i++) {
                    if (payment.links[i].rel === 'approval_url') {
                        res.redirect(payment.links[i].href);
                    }
                }
            }
        });
    }
    success(req, res) {
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;
        const cart = new Cart(req.session.cart)
        const price = Math.round((cart.Price / 23041) * 100) / 100

        const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": price
                }
            }]
        };

        paypal.payment.execute(paymentId, execute_payment_json, function (err, payment) {
            if (err) {
                console.log(err);
            } else {
                req.session.destroy((err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        req.session = null
                        console.log(req.session);
                        res.render('user/success');
                    }
                })
            }
        });
    }
}
module.exports = new main