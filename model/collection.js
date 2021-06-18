const mongoose = require("mongoose")
const collectionSchema = mongoose.Schema({
    name: String,
    category :[mongoose.Schema.Types.ObjectId]
})

module.exports = mongoose.model("collection", collectionSchema)