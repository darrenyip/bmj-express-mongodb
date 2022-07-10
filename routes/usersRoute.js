const express = require("express");
const usersRouter = express.Router();

const {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    createUser,
    loginUser,
} = require("../controllers/userController");

usersRouter.route("/").get(getAllUsers);
usersRouter.route("/signup").post(createUser);
usersRouter.route("/login").post(loginUser);
usersRouter.route("/:id").get(getUser).delete(deleteUser).patch(updateUser);

module.exports = usersRouter;