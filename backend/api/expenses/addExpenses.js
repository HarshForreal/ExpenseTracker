const express = require("express");
const router = express.Router();
const Expense = require("../../models/Expense"); // Import the Expense model


router.post("/add", async (req, res) => {
  const { expenseName, amount, category } = req.body;

  if (!expenseName || !amount || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const expense = new Expense({
      expenseName,
      amount,
      category,
    });

    const savedExpense = await expense.save();

    console.log("Expense Added: ", savedExpense);
    res.status(201).json({
      message: "Expense added successfully",
      savedExpense,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add expense",
      error: error.message,
    });
  }
});


router.get("/expenses", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch expenses",
      error: error.message,
    });
  }
});

module.exports = router;
