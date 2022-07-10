const express = require("express");
const productRoute = express.Router();

const {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    createUser,
} = require("../controllers/userController");

productRoute.route("/").get(getAllUsers);
productRoute.route("/signup").post(createUser);
productRoute.route("/:id").get(getUser).delete(deleteUser).patch(updateUser);

module.exports = usersRouter;