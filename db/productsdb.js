const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Schema.Types.Decimal128,
        required: true,
    },
    // kg , 箱， 包
    unit: {
        type: String,
        required: true,
    },
    volumne: {
        type: Number,
        required: true,
    },
    unitWeight: {
        type: Number,
        required: true,
    },
    codeInSystem: {
        type: String,
        required: true,
    },
    barcode: {
        type: String,
        required: true,
    },
    updated: {
        type: Date,
        default: Date.now,
    },
}, { collection: "Products" });

module.exports = mongoose.model("Product", productSchema);