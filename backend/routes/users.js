const express = require("express");
const User = require("../models/User");
const { authenticate, requireAdmin } = require("../middleware/auth");

const router = express.Router();

// All routes require auth + admin
router.use(authenticate, requireAdmin);

// GET /api/users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users.map((u) => u.toJSON()));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/users/:id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user.toJSON());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/users/:id
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
