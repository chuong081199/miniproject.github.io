const collectionRoute = require("./collectionsRoute")
const accountRoute = require("./accountRoute")
const userRoute = require("./userRoute")
const userInteface = require("./userInteface")
const blogRoute = require("./blogRoute")

function route(app){
    // frontend
    app.use("/", userInteface)
    
    //backend 
    app.use("/admin", accountRoute)
    app.use("/manage/collection", collectionRoute)
    app.use("/admin/user", userRoute)
    app.use("/admin/blog", blogRoute)
}
module.exports = route