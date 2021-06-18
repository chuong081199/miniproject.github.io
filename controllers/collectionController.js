
const collection = require("../model/collection")
const category = require("../model/category")
const product = require("../model/product")
const oder = require("../model/order")
const { model } = require("mongoose")
const { query } = require("express")


class CollectionController {

    //[GET] collection
    collection(req, res) {
        collection.find().populate({ path: "category", model: category }).exec((err, data) => {
            if (err) {
                console.log(err)
            } else {
                res.render("manage/collection", { data: data })
            }
        })
    }
    //[POST] add collection
    postCollection(req, res) {
        var Collection = new collection({
            name: req.body.name,
            category: []
        })
        Collection.save((err) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect("/manage/collection/show")
            }
        })

    }
    //[GET] add collection
    addCollection(req, res) {
        res.render("manage/addCollection")
    }
    //[GET] edit collection
    editCollection(req, res) {
        collection.findById(req.params.id, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.render("manage/editCollection", { data: data })
            }
        })
    }
    //[POST] edit collection
    updateCollection(req, res) {
        collection.findByIdAndUpdate(req.body.id, {
            name: req.body.name
        }, (err) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect("/manage/collection/show")
            }
        })
    }
    //[GET] delete collection
    deleteCollection(req, res) {
        collection.findByIdAndRemove(req.params.id, (err) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect("/manage/collection/show")
            }
        })
    }
    //____________________________\\
    //[POST] add category
    postCategory(req, res) {
        var Category = new category({
            name: req.body.name,
            product: []
        })
        Category.save((err) => {
            if (err) {
                console.log(err);
            } else {
                collection.findOneAndUpdate({ _id: req.body.collection }, { $push: { category: Category._id } }, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect("/manage/collection/show")
                    }
                })

            }
        })
    }
    //[GET] add categpry
    addcategory(req, res) {
        collection.find((err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.render("manage/addCategory", { data: data })
            }
        })
    }
    //[GET] edit category
    editCategory(req, res) {
        category.findById(req.params.id, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.render("manage/editCategory", { data: data })
            }
        })
    }
    //[POST] edit category
    updateCategory(req, res) {
        category.findByIdAndUpdate(req.body.id, {
            name: req.body.name
        }, (err) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect("/manage/collection/show")
            }
        })
    }
    //[GET] delete category
    deleteCategory(req, res) {
        category.findByIdAndDelete(req.params.id, (err) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect("/manage/collection/show")
            }
        })
    }
    //____________________________\\
    //[GET] product
    products(req, res) {
        category.find().populate({ path: "products", model: product }).exec((err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.render("manage/products", { data: data })
                // res.json(data)
            }
        })
    }
    //[GET] add product
    addProduct(req, res) {
        category.find((err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.render("manage/addProduct", { data: data })
            }
        })
    }
    //[POST] add product
    postProduct(req, res) {
        var filenames = req.files.map(function (file) {
            return file.filename; // or file.originalname
        });
        var sizes = req.body.size
        var size = sizes.split(" ")
        var check = false
        if (req.body.status) {
            check = true
        }
        var Product = new product({
            name: req.body.name,
            image: filenames,
            price: req.body.price,
            code: req.body.code,
            size: size,
            describe: req.body.mytextarea,
            sale: req.body.sale,
            status: check
        })
        Product.save((err) => {
            if (err) {
                console.log(err);
            } else {
                category.findOneAndUpdate({ _id: req.body.nameCategory }, { $push: { products: Product._id } }, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect("/manage/collection/products")
                    }
                })
            }
        })
    }
    //[GET] edit product
    editProduct(req, res) {
        product.findById(req.params.id, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.render("manage/editProduct", { data: data })
            }
        })
    }
    //[POST] edit product
    updateProduct(req, res) {
        var sizes = req.body.size
        var size = sizes.split(" ")
        var check = false
        if (req.body.status) {
            check = true
        }
        var file = req.files
        if (file.length == 0) {
            var productUpdate = {
                name: req.body.name,
                price: req.body.price,
                code: req.body.code,
                size: size,
                describe: req.body.mytextarea,
                sale: req.body.sale,
                status: check
            }
        } else {
            var filenames = req.files.map(function (file) {
                return file.filename; // or file.originalname
            });
            var productUpdate = {
                name: req.body.name,
                image: filenames,
                price: req.body.price,
                code: req.body.code,
                size: size,
                describe: req.body.mytextarea,
                sale: req.body.sale,
                status: check
            }
        }
        product.findByIdAndUpdate(req.body.id, productUpdate, (err) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect("/manage/collection/products")
            }
        })

    }
    //[GET] delete product
    deleteProduct(req, res) {
        product.findByIdAndRemove(req.params.id, (err) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect("/manage/collection/products")
            }
        })
    }
    //[GET] oder
    order(req, res){
        oder.find((err, data)=>{
            if(err){
                console.log(err);
            }else{
                res.render("manage/oder", {data: data})
            }
        })
    }
    check(req, res){
        oder.findByIdAndUpdate(req.params.id, {check : true }, (err)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect("/manage/collection/order")
            }
        })
    }
    history(req, res){
        oder.find((err, data)=>{
            if(err){
                console.log(err);
            }else{
                res.render("manage/history", {data: data})
            }
        })
    }
}

module.exports = new CollectionController
