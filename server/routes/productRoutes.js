const express = require("express");
const Product = require("../models/Product");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

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

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.post("/add", protect, async (req, res) => {
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

router.delete("/:id", protect, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

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