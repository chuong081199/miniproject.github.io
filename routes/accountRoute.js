const express = require("express")
const router = express.Router()

const account = require("../controllers/accountController")

const { ensureAuthenticated, forwardAuthenticated } = require("../middleware/auth");

router.get("/", forwardAuthenticated, account.page);

router.get("/dashboard", ensureAuthenticated, account.home);

router.get("/login",forwardAuthenticated, account.login)

router.get("/register",ensureAuthenticated, account.register)

router.post("/register", account.postRegister)

router.post("/login", account.postLogin)

router.get("/logout", account.logout)




module.exports = router