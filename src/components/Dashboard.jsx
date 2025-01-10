// import AddExpense from "./features/AddExpense.jsx";
// import SplitExpense from "./features/SplitExpense.jsx";

// export default function Dashboard() {
//   return (
//     <div className="min-h-screen p-10 bg-[#FEF9E1]">
//       <h1 className="text-4xl font-bold text-[#771D32] text-center mb-10">
//         Dashboard
//       </h1>
//       <div className="space-y-8">
//         <AddExpense />
//         <SplitExpense />
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import axios from "axios";
import AddExpense from "./features/AddExpense.jsx";
import SplitExpense from "./features/SplitExpense.jsx";

export default function Dashboard() {
  const [user, setUser] = useState(null); // To store the logged-in user's details
  const [personalExpense, setPersonalExpense] = useState(null); // To store the user's personal expense
  const [error, setError] = useState(""); // To handle errors

  // Fetch the logged-in user's data and their personal expense
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user")); // Retrieve user data from local storage
    setUser(loggedInUser);

    if (loggedInUser) {
      axios
        .get(
          `https://expense-tracker-qn11-harshforreals-projects.vercel.app/api/users/getPersonalExpense`,
          {
            params: { email: loggedInUser.email },
          }
        )
        .then((response) => {
          if (response.data.success) {
            setPersonalExpense(response.data.amount); // Set the user's personal expense
          }
        })
        .catch((error) => {
          console.error("Error fetching user expenses:", error);
          setError("Failed to fetch personal expenses.");
        });
    }
  }, []);

  return (
    <div className="min-h-screen p-10 bg-[#FEF9E1]">
      <h1 className="text-4xl font-bold text-[#771D32] text-center mb-10">
        Dashboard
      </h1>

      <div className="mb-8">
        {user && (
          <p className="text-2xl text-[#771D32] font-semibold">
            Welcome, {user.name}!
          </p>
        )}
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : personalExpense !== null ? (
          <p className="text-xl text-gray-800">
            Your Personal Expense:{" "}
            <span className="font-bold">${personalExpense}</span>
          </p>
        ) : (
          <p className="text-gray-500">Loading your personal expense...</p>
        )}
      </div>

      {/* Features Section */}
      <div className="space-y-8">
        <AddExpense />
        <SplitExpense />
      </div>
    </div>
  );
}
