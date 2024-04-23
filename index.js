const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const server = express();
const path = require("path");
const productRouter = require("./routers/product.router");
const userRouter = require("./routers/user.router");
const authRouter = require("./routers/auth.router");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
// MIDDLEWARES
const isAuth = (req, res, next) => {
  try {
    const token = req.get("Authorization").split("Bearer ")[1];
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    if (decoded.email) {
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(401);
  }
};
server.use(cors());
server.use(express.json()); //build in middleware -> body perser
server.use(express.static(path.resolve(__dirname, "dist")));
// server.use(morgan("default"));
server.use("/products", isAuth, productRouter.router);
server.use("/users", userRouter.router);
server.use("/auth", authRouter.router);
server.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});
//DB connection code
// main().catch((err) => console.log(err));

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
//MVC -> Model-View-Controle

server.listen(8080, () => {
  console.log("server is started!!!");
});
