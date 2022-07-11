const express = require("express");
const productRoute = express.Router();

const {
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    createProduct,
} = require("../controllers/productController");

productRoute.route("/").get(getAllProducts);
productRoute.route("/create").post(createProduct);
productRoute
    .route("/:id")
    .get(getProduct)
    .delete(deleteProduct)
    .patch(updateProduct);

module.exports = productRoute;