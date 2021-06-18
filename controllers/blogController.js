const blog = require("../model/blog")

class Blog {
    index(req, res) {
        blog.find((err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.render("manage/blog", { data: data })
            }
        })
    }
    //[GET] add blog
    addBlog(req, res) {
        res.render("manage/addBlog")
    }
    //[POST] add blog
    postAddBlog(req, res) {
        var filename = req.files.map(function (file) {
            return file.filename; // or file.originalname
        })
        const blogs = new blog({
            title: req.body.name,
            image: filename,
            content: req.body.mytextarea
        })
        blogs.save((err) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect("/admin/blog")
            }
        })
    }
    //[GET] edit blog
    editBlog(req, res) {
        blog.findById(req.params.id, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.render("manage/editBlog", { data: data })
            }
        })
    }
    postEditBlog(req, res) {
        var file = req.files
        console.log(file);
        if (file.length == 0) {
            var blogUpdate = {
                title: req.body.name,
                content: req.body.mytextarea
            }
        } else {
            var filename = req.files.map(function (file) {
                return file.filename; // or file.originalname
            });
            var blogUpdate = {
                title: req.body.name,
                image: filename,
                content: req.body.mytextarea
            }
        }
        blog.findByIdAndUpdate(req.body.id, blogUpdate, (err)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect("/admin/blog")
            }
        })
    }
    deleteBlog(req, res){
        blog.findByIdAndRemove(req.params.id, (err)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect("/admin/blog")
            }
        })
    }
}
module.exports = new Blog