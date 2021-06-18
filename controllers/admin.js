const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const Admin = require('../model/admin');

class admin{
    login(req, res){
        res.render("manage/login")
    }
}
module.exports = new admin
