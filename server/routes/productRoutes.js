const express = require("express");
const Product = require("../models/Product");

const router = express.Router();


// Get all products
router.get("/", async (req, res) => {
  try {

    const products = await Product.find();

    res.status(200).json(products);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


// Get single product
router.get("/:id", async (req, res) => {
  try {

    const product = await Product.findById(
      req.params.id
    );

    res.status(200).json(product);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


// Add product
router.post("/add", async (req, res) => {
  try {

    const product = await Product.create(req.body);

    res.status(201).json({
      message: "Product added",
      product
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


// Delete product
router.delete("/:id", async (req, res) => {
  try {

    await Product.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Product deleted"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;