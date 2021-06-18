const mongoose = require("mongoose")
const productSchema = mongoose.Schema({
    name: String,
    image: [mongoose.Schema.Types.String],
    price: Number,
    code: String,
    color: String,
    size: [mongoose.Schema.Types.String],
    describe: String,
    sale: Number,
    status: Boolean
})

module.exports = mongoose.model("product", productSchema)