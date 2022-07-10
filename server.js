require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

// mongodb setup
const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to db"));

// Express
// app.use(express.json());
app.use(bodyParser.json());
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});
// --------- User Route ----------
const usersRouter = require("./routes/usersRoute");
app.use("/users", usersRouter);
// --------- Product Route ----------
// const productsRoute = require("./routes/productsRoute");
// app.use("/products", usersRouter);

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server stared on port ${port}`));