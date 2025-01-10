import { useState, useEffect } from "react";
import axios from "axios";

export default function SplitExpense() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [splitResults, setSplitResults] = useState([]);

  // Fetch users from the backend to populate the dropdown
  useEffect(() => {
    axios
      .get("https://expense-tracker-qn11.vercel.app/api/users/list")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.error("Failed to fetch users:", error));
  }, []);

  // Calculate Split Amount Dynamically
  useEffect(() => {
    if (amount && selectedUsers.length > 0) {
      const splitAmount = (amount / (selectedUsers.length + 1)).toFixed(2); // +1 includes yourself
      const results = selectedUsers.map((userId) => {
        const user = users.find((user) => user._id === userId);
        return {
          userId,
          userName: user ? user.name : "Unknown",
          owes: splitAmount,
        };
      });

      setSplitResults(results);
    }
  }, [amount, selectedUsers, users]);

  const handleSplitExpense = async (e) => {
    e.preventDefault();

    if (!expenseName || !amount || selectedUsers.length === 0) {
      alert("Please fill in all fields and select at least one user!");
      return;
    }

    try {
      const response = await axios.post(
        "https://expense-tracker-qn11.vercel.app/api/expenses/split",
        {
          expenseName,
          amount,
          selectedUsers,
        }
      );

      if (response.status === 201) {
        setMessage("Expense split successfully!");
        resetForm(false); // Don't reset breakdown immediately
      }
    } catch (error) {
      setMessage("Failed to split expense.");
      console.error("Error:", error);
    }
  };

  const resetForm = (clearResults = true) => {
    setExpenseName("");
    setAmount("");
    setSelectedUsers([]);
    if (clearResults) setSplitResults([]);
  };

  const handleUserSelect = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Split Expense</h2>

      <form onSubmit={handleSplitExpense}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Expense Name
          </label>
          <input
            type="text"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            className="mt-1 block w-full p-2 border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full p-2 border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Split With (Select Multiple)
          </label>
          <div className="mt-1 p-2 border rounded-lg">
            {users.map((user) => (
              <div key={user._id} className="flex items-center space-x-3 mb-2">
                <input
                  type="checkbox"
                  id={user._id}
                  value={user._id}
                  checked={selectedUsers.includes(user._id)}
                  onChange={() => handleUserSelect(user._id)}
                  className="w-4 h-4"
                />
                <label htmlFor={user._id}>
                  {user.name} - {user.email}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={resetForm}
            className="px-6 py-2 border border-gray-300 rounded-lg"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            Split Expense
          </button>
        </div>

        {message && (
          <p className="text-center mt-4 text-green-500">{message}</p>
        )}
      </form>

      {/* Split Breakdown */}
      {splitResults.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Split Breakdown</h3>
          <ul>
            {splitResults.map((result) => (
              <li
                key={result.userId}
                className="p-4 border-b flex justify-between"
              >
                <span>{result.userName}</span>
                <span>Owes: ${result.owes}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
