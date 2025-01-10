const express = require("express");
const router = express.Router();
const Expense = require("../../models/Expense");

router.put("/update/:id", async (req, res) => {
  const { id } = req.paramsl;
  const { expenseName, amount, category } = req.body;
  if (!expenseName || !amount || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const updateExpense = await Expense.findByIdAndUpdate(
      id,
      { expenseName, amount, category },
      { new: true }
    );
    if (!updateExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({
      message: "Expenses updated successfully",
      updateExpense,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update expense",
      error: error.message,
    });
  }
});

module.exports = router;
