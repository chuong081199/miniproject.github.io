const user = require("../model/User")
const bcrypt = require('bcryptjs');

class users {
    index(req, res) {
        user.find((err, data) => {
            if (err) { console.log(err) }
            else {
                res.render("manage/user", { data: data })
            }
        })
    }
    deleteUser(req, res) {
        user.findByIdAndRemove(req.params.id, (err) => {
            if (err) { console.log(err) }
            else { res.redirect("/admin/user") }
        })
    }
    changePassword(req, res) {
        user.findById(req.params.id, (err, data) => {
            res.render("manage/changePassword", {
                data: data
            })
        })

    }
    postNewPassword(req, res) {
        user.findById(req.body.id, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                const { password, newPassword, newPassword2 } = req.body
                var errors = []

                if (!password || !newPassword || !newPassword2) {
                    errors.push({ msg: "Please enter all fields" })
                }
                if (newPassword != newPassword2) {
                    errors.push({ msg: 'Passwords do not match' });
                }
                if (newPassword.length < 6) {
                    errors.push({ msg: 'Password must be at least 6 characters' });
                }
                if(password == newPassword){
                    errors.push("mat khau trung nhau")
                }
                bcrypt.compare(password, data.password, function (err, res) {
                    if (!res) {
                        errors.push({ msg: "Old password is not correct" })
                    }
                })
                if (errors.length > 0) {
                    user.findById(req.body.id, (err, data) => {
                        res.render("manage/changePassword", {
                            data: data,
                            errors,
                            password,
                            newPassword,
                            newPassword2
                        })
                    })
                } else {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newPassword, salt, (err, hash) => {
                            if (err) throw err
                            const savePassword = hash
                            user.findByIdAndUpdate(req.body.id, { "password": savePassword }, (err) => {
                                if (err) {
                                     console.log(err);
                                    }
                                else {
                                    req.flash(
                                        "success_msg",
                                        "You have successfully changed your password"
                                    )
                                    res.redirect("/admin/dashboard")
                                }
                            })
                        })
                    })
                }
            }
        })
    }
}
module.exports = new users