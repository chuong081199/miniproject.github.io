const express = require("express")
const router = express.Router()
const uploadFile = require("../middleware/uploadMiddleware")
const { ensureAuthenticated, forwardAuthenticated } = require("../middleware/auth");

const collectionController = require("../controllers/collectionController")

router.get("/show",ensureAuthenticated, collectionController.collection)

router.post("/postCollection", collectionController.postCollection)

router.get("/addCollection",ensureAuthenticated, collectionController.addCollection)

router.post("/postCategory", collectionController.postCategory)

router.get("/addCategory",ensureAuthenticated, collectionController.addcategory)

router.post("/postProduct", uploadFile, collectionController.postProduct)

router.get("/addProduct",ensureAuthenticated, collectionController.addProduct)

router.get("/products",ensureAuthenticated, collectionController.products)

router.get("/editProduct/:id",ensureAuthenticated, collectionController.editProduct)

router.post("/editProduct/update",uploadFile, collectionController.updateProduct)

router.get("/deleteProduct/:id", collectionController.deleteProduct)

router.get("/editCollection/:id",ensureAuthenticated, collectionController.editCollection)

router.post("/editCollection/updateCollection", collectionController.updateCollection)

router.get("/deleteCollection/:id",ensureAuthenticated, collectionController.deleteCollection)

router.get("/editCategory/:id",ensureAuthenticated, collectionController.editCategory)

router.post("/editCategory/updateCategory", collectionController.updateCategory)

router.get("/deleteCategory/:id",ensureAuthenticated, collectionController.deleteCategory)

router.get("/order", ensureAuthenticated, collectionController.order)

router.get("/check/:id", ensureAuthenticated, collectionController.check )

router.get("/history", ensureAuthenticated, collectionController.history)

module.exports = router