const express = require("express");
const router = express.Router();
const Expense = require("../../models/Expense");
const User = require("../../models/Users");

// POST route to split expense
router.post("/split", async (req, res) => {
  const { expenseName, amount, selectedUsers } = req.body;
  const splitAmount = amount / (selectedUsers.length + 1); // Split among users + you

  try {
    // Create a new expense
    const expense = new Expense({
      expenseName,
      amount: splitAmount,
      category: "Split Expense",
    });

    await expense.save();

    // Update the amount field for each selected user
    await Promise.all(
      selectedUsers.map(async (userId) => {
        const user = await User.findById(userId);
        if (user) {
          user.amount += splitAmount;
          await user.save();
        }
      })
    );

    res.status(201).json({
      message: "Expense split successfully",
      expense,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to split expense",
      error: error.message,
    });
  }
});

module.exports = router;