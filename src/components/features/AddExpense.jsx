import { useState, useEffect } from "react";
import axios from "axios";

export default function AddExpense() {
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [expenses, setExpenses] = useState([]); // State to hold fetched expenses

  // Fetch expenses when component loads
  useEffect(() => {
    fetchExpenses();
  }, []);

  // Function to fetch expenses from backend
  const fetchExpenses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/expenses/expenses"
      );
      setExpenses(response.data); // Store fetched expenses in state
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!expenseName || !amount || !category) {
      alert("Please fill in all fields!");
      return;
    }

    const newExpense = {
      expenseName,
      amount: parseFloat(amount),
      category,
    };

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/expenses/add",
        newExpense
      );

      if (response.status === 201) {
        setMessage("Expense added successfully!");
        resetForm();
        fetchExpenses(); // Re-fetch expenses to update the list
      }
    } catch (error) {
      setMessage("Failed to add expense. Try again.");
      console.error("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setExpenseName("");
    setAmount("");
    setCategory("");
  };

  const totalAmount = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center font">
        Add New Expense
      </h2>

      <form onSubmit={handleAddExpense}>
        <div className="mb-4">
          <label
            htmlFor="expenseName"
            className="block text-sm font-medium text-gray-700"
          >
            Expense Name
          </label>
          <input
            type="text"
            id="expenseName"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
            required
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Miscellaneous">Miscellaneous</option>
            <option value="Health">Health</option>
          </select>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={resetForm}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>

        {message && (
          <p
            className={`text-center mt-4 ${
              message.includes("success") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </form>

      {/* Display List of Expenses */}
      <ul>
        {expenses.map((expense) => (
          <li
            key={expense._id}
            className="grid grid-cols-[2fr_1fr_1fr] p-4 border-b"
          >
            <span>{expense.expenseName}</span>
            <span className="text-center">${expense.amount}</span>
            <span className="text-right">
              {new Date(expense.date).toLocaleDateString()}
            </span>
          </li>
        ))}
        <li className="grid grid-cols-[2fr_1fr_1fr] p-4 border-t mt-4 font-bold">
          <span>Total</span>
          <span className="text-center">${totalAmount}</span>
          <span></span>
        </li>
      </ul>
    </div>
  );
}
