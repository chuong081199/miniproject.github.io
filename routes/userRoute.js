const express = require("express")
const router = express.Router()
const userController = require("../controllers/userCollection")
const { route } = require("./collectionsRoute")
const { ensureAuthenticated, forwardAuthenticated } = require("../middleware/auth");

router.get("/",ensureAuthenticated, userController.index)

router.get("/deleteUser/:id",ensureAuthenticated, userController.deleteUser)

router.get("/changeP/:id",ensureAuthenticated, userController.changePassword)

router.post("/postNewPassword", userController.postNewPassword)

module.exports = router