const mongoose = require("mongoose")
const categorySchema = mongoose.Schema({
    name: String,
    products :[mongoose.Schema.Types.ObjectId]
})

module.exports = mongoose.model("category", categorySchema)