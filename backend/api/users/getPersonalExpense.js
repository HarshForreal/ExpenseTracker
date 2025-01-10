const express = require("express");
const router = express.Router();
const User = require("../../models/Users"); // Update with your actual User model path

// Route to fetch user expenses by email
router.get("/getPersonalExpense", async (req, res) => {
  const { email } = req.query; // Get the email from query parameters

  try {
    const user = await User.findOne({ email }); // Find user by email
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      amount: user.amount,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user expenses",
      error: error.message,
    });
  }
});

module.exports = router;
