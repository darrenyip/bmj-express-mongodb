const Bcrypt = require("bcryptjs");
const JsonWebToken = require("jsonwebtoken");

const Users = require("../db/usersdb");
// get all
const SECRET_JWT_CODE = process.env.SECRET_JWT_CODE;

exports.getAllUsers = async(req, res) => {
    console.log("getAllUsers");
    try {
        const users = await Users.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getUser = async(req, res) => {
    console.log("getUser");
    const id = req.params.id;
    console.log(id);
    res.send(id);
};
exports.updateUser = async(req, res) => {
    console.log("getUser");
};
exports.deleteUser = async(req, res) => {
    console.log("getUser");
};
exports.createUser = async(req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).json({ success: false, error: "send needed params" });
    }
    const { email, name } = req.body;
    Users.create({
            email,
            name,
            password: Bcrypt.hashSync(req.body.password, 10),
        })
        .then((user) => {
            const token = JsonWebToken.sign({ id: user._id, email: user.email },
                SECRET_JWT_CODE
            );
            res.json({ success: true, token: token });
        })
        .catch((err) => {
            res.status(400).json({ success: false, error: err });
        });
};
exports.loginUser = async(req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(500).json({ success: false, error: "need params" });
    }
    Users.findOne({ email })
        .then((user) => {
            if (!user) {
                res.json({ success: false, error: "user does not exist" });
            } else {
                if (!Bcrypt.compareSync(password, user.password)) {
                    res.json({ success: false, error: "wrong password" });
                } else {
                    const token = JsonWebToken.sign({ id: user._id, email: user.email },
                        SECRET_JWT_CODE
                    );
                    res.status(200).json({ success: true, token: token });
                }
            }
        })
        .catch((err) => {
            res.status(500).json({ success: false, error: err });
        });
};

// checkToken

function fetchUserByToken(req) {
    return new Promise((resolve, reject) => {
        if (req.headers && req.headers.authorization) {
            let authorization = req.headers.authorization;
            let decoded;
            try {
                decoded = JsonWebToken.verify(authorization, SECRET_JWT_CODE);
            } catch (error) {
                reject("Token not valid");
                return;
            }
            let userId = decoded.id;
            Users.findOne({ _id: userId })
                .then((user) => {
                    resolve(user);
                })
                .catch((err) => {
                    reject("Token Error");
                });
        } else {
            reject("no token found");
        }
    });
}
// validate token usage
// app.get("/example", (req, res) => {
//     fetchUserByToken(req)
//         .thrn((user) => {
//             // token is valid
//         })
//         .catch((err) => {
//             // token is not valid
//             // send error message
//         });
// });