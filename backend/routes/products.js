const express = require("express");
const Product = require("../models/Product");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// GET /api/products
router.get("/", async (req, res) => {
  try {
    const { category, search, sort } = req.query;
    const filter = { user: req.user._id };

    if (category) filter.category = category;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    let query = Product.find(filter);

    if (sort === "name") query = query.sort({ name: 1 });
    else if (sort === "price") query = query.sort({ price: -1 });
    else query = query.sort({ createdAt: -1 });

    const products = await query;
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/products
router.post("/", async (req, res) => {
  try {
    const { name, price, description, stock, category } = req.body;
    const product = await Product.create({
      name,
      price,
      description,
      stock,
      category,
      user: req.user._id,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/products/:id
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!product) {
      return res.status(404).json({ message: "Habit not found" });
    }
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
