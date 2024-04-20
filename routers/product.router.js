const express = require("express");
const router = express.Router();
const productController = require("../controller/product.controller");
router
  .post("/", productController.createProduct)
  .get("/", productController.getAllProducts)
  .get("/ssr", productController.getAllProductsSSR)
  .get("/:id", productController.getProductByID)
  .put("/:id", productController.replaceProductByID)
  .patch("/:id", productController.updateProductByID)
  .delete("/:id", productController.deleteProductById);

exports.router = router;
