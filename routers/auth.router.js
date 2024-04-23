const express = require("express");
const router = express.Router();
const authControler = require("../controller/auth.controller");

router
  .post("/signup", authControler.signUp)
  .post("/signin", authControler.signIn);

exports.router = router;
