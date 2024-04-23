const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
router
  .get("/", userController.getAllUsers)
  .get("/:id", userController.getUserByID)
  .put("/:id", userController.replaceUserByID)
  .patch("/:id", userController.updateUserByID)
  .delete("/:id", userController.deleteUserById);

exports.router = router;
