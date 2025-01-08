const express = require("express");
const router = express.Router();
const User = require("../../models/Users");

// GET route to fetch all users
router.get("/list", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
      error: error.message,
    });
  }
});

module.exports = router;
