const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../model/User');
const Cate = require("../model/category")

class account {
    // Welcome Page
    page(req, res) {
        res.render("manage/welcome")
    }
    // home
    home(req, res) {
        Cate.find((err, data)=>{
            if(err){
                console.log(err);
            }else{
                let labels = []
                data.forEach((label)=>{
                    labels.push(label.name)
                })
                let lengths = []
                data.forEach((length)=>{
                    lengths.push(length.products.length)
                })
                res.render("manage/home", {
                    user: req.user,
                    labels: labels,
                    lengths: lengths
                })
            }
        })       
    }
    // Login Page
    login(req, res) {
        res.render("manage/login")
    }
    // Register Page
    register(req, res) {
        res.render("manage/register")
    }
    // Register
    postRegister(req, res) {
        const { name, email, password, password2 } = req.body;
        let errors = [];

        if (!name || !email || !password || !password2) {
            errors.push({ msg: 'Please enter all fields' });
        }

        if (password != password2) {
            errors.push({ msg: 'Passwords do not match' });
        }

        if (password.length < 6) {
            errors.push({ msg: 'Password must be at least 6 characters' });
        }

        if (errors.length > 0) {
            res.render("manage/register", {
                errors,
                name,
                email,
                password,
                password2
            });
        } else {
            User.findOne({ email: email }).then(user => {
                if (user) {
                    errors.push({ msg: 'Email already exists' });
                    res.render("manage/register", {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    req.flash(
                                        'success_msg',
                                        'You are now registered and can log in'
                                    );
                                    res.redirect('/admin/user');
                                })
                                .catch(err => console.log(err));
                        });
                    });
                }
            });
        }
    }
    // login
    postLogin(req, res, next) {
        passport.authenticate('local', {
            successRedirect: '/admin/dashboard',
            failureRedirect: '/admin/login',
            failureFlash: true
        })(req, res, next)
    }
    // logout
    logout(req, res) {
        req.logout()
        req.flash('success_msg', 'You are logged out');
        res.redirect('/admin/login');
    }
}

module.exports = new account;