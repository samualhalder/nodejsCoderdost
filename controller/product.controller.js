// const fs = require("fs");
const { Product } = require("../models/product.model");
const { response } = require("express");
const ejs = require("ejs");
const path = require("path");
const { log } = require("console");

//view
exports.getAllProductsSSR = async (req, res) => {
  const products = await Product.find();
  console.log("innn");
  ejs.renderFile(
    path.resolve(__dirname, "../index.ejs"),
    { products: products },
    function (err, str) {
      res.send(str);
    }
  );
};

//controler

exports.createProduct = (req, res) => {
  const product = new Product(req.body);
  product
    .save()
    .then((response) => {
      // console.log(response);
      res.status(201).json(response);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
};

exports.getAllProducts = (req, res) => {
  Product.find()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
  // res.json(products);
};

exports.getProductByID = (req, res) => {
  const id = req.params.id;
  Product.findById(id)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
  //console.log(product);
  //res.json(product);
};

exports.replaceProductByID = (req, res) => {
  const id = req.params.id;
  Product.findOneAndReplace(id, req.body)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
  // res.sendStatus(202);
};
exports.updateProductByID = (req, res) => {
  const id = req.params.id;
  Product.findOneAndUpdate({ _id: id }, req.body, { new: true })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
};
exports.deleteProductById = (req, res) => {
  console.log("in delete");
  const id = req.params.id;
  Product.findOneAndDelete({ _id: id }, { new: true })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
};
