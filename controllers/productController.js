const ProductsDb = require("../db/productsdb");

exports.getAllProducts = async(req, res) => {
    console.log("get all products!!!", ProductsDb);
    try {
        const products = await ProductsDb.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message, ProductsDb });
    }
};
exports.getProduct = async(req, res) => {
    const id = req.params.id;
    console.log("get product", id);
    try {
        const product = await ProductsDb.findOne({ _id: id });
        res.send(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createProduct = async(req, res) => {
    const {
        inStock,
        name,
        price,
        unit,
        volumn,
        unitWeight,
        codeInSystem,
        barcode,
    } = req.body;
    if (!name || !price) {
        res.status(400).json({ success: false, error: "send needed params" });
    }
    await ProductsDb.create({
            name,
            price,
            unit,
            volumn,
            unitWeight,
            codeInSystem,
            barcode,
            inStock,
        })
        .then((result) => {
            res.json({ success: true, result: result });
        })
        .catch((err) => {
            res.status(400).json({ success: false, error: err.message });
        });
};
exports.updateProduct = async(req, res) => {
    console.log("update products");
};
exports.deleteProduct = async(req, res) => {
    console.log("delete product");
};