const Mongoose = require("mongoose")

const blogSchema = Mongoose.Schema({
    title: String,
    image: [Mongoose.Schema.Types.String],
    content: String
})
module.exports = Mongoose.model("blog", blogSchema)