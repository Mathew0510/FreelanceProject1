const express = require("express");
const Order = require("../models/Order");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const order = await Order.create(req.body);

    res.status(201).json({
      message: "Order created successfully",
      order
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.get("/", protect, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.get("/:email", async (req, res) => {
  try {
    const orders = await Order.find({
      email: req.params.email
    }).sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.put("/:id/status", protect, async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true }
    );

    res.status(200).json({
      message: "Order status updated",
      order
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;