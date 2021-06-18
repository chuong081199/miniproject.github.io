const mongoose = require("mongoose")
const categorySchema = mongoose.Schema({
    name: String,
    phone: Number,
    add: String,
    products: [mongoose.Schema.Types.String],
    quantity: [mongoose.Schema.Types.Number],
    price: [mongoose.Schema.Types.Number],
    check: Boolean,
    pay: String
})

module.exports = mongoose.model("oder", categorySchema)