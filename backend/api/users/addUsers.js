const express = require("express");
const router = express.Router();
const User = require("../../models/Users");

// POST route to add a new user
router.post("/addUser", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = new User({ name, email, password });
    const savedUser = await user.save();
    res.status(201).json({ message: "User added successfully", savedUser });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add user",
      error: error.message,
    });
  }
});

module.exports = router;
