const express = require("express");
const router = express.Router();
const Expense = require("../../models/Expense"); // Import the model

// GET route for fetching all expenses
router.get("/getExpenses", async (req, res) => {
  try {
    const expenses = await Expense.find(); // Fetch all expenses from MongoDB
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch expenses",
      error: error.message,
    });
  }
});

module.exports = router;
