const express = require("express");
const router = express.Router();
const User = require("../../models/Users");

// POST route to handle user login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (user && user.password === password) {
      res.status(200).json({ success: true, user });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Failed to login",
      error: error.message,
    });
  }
});

module.exports = router;