const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Home Route
app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});


// Auth Routes
app.use("/api/auth", authRoutes);


// Product Routes
app.use("/api/products", productRoutes);


// Server Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});