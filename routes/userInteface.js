const express = require("express")
const router = express.Router()
const userInteface = require("../controllers/userIntefaceController")

router.get("", userInteface.index )

router.get("/products", userInteface.products)

router.get("/products/:id", userInteface.product)

router.get("/products/addcard/:id", userInteface.addCart)

router.get("/about", userInteface.about)

router.get("/contact", userInteface.contac)

router.get("/blog", userInteface.blogs )

router.get("/blog/:id", userInteface.blog )


router.get("/checkOut", userInteface.checkOut)

router.post("/checkOut", userInteface.postCheckOut)

router.post("/pay", userInteface.postcheckPaypal)

router.get("/success", userInteface.success)

router.get("/cart", userInteface.cart)

module.exports = router