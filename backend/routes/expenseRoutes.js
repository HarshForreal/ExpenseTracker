const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// POST: Add a new expense
router.post('/add', async (req, res) => {
  const { expenseName, amount, category } = req.body;
  
  if (!expenseName || !amount || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const expense = new Expense({ expenseName, amount, category });
    const savedExpense = await expense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(500).json({ message: "Failed to add expense", error });
  }
});

// GET: Retrieve all expenses
router.get('/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve expenses", error });
  }
});

module.exports = router;
