const express = require("express")
const router = express.Router()
const { ensureAuthenticated, forwardAuthenticated } = require("../middleware/auth");

const upload = require("../middleware/uploadMiddleware")

const Blog = require("../controllers/blogController")

router.get("/",ensureAuthenticated, Blog.index)

router.get("/addBlog",ensureAuthenticated, Blog.addBlog)

router.post("/postBlog",upload, Blog.postAddBlog)

router.get("/editBlog/:id",ensureAuthenticated, Blog.editBlog)

router.post("/editBlog/postEditBlog",upload, Blog.postEditBlog)

router.get("/deleteBlog/:id",ensureAuthenticated, Blog.deleteBlog)

module.exports = router