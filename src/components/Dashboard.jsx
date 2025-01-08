import AddExpense from "./features/AddExpense.jsx";
import SplitExpense from "./features/SplitExpense.jsx";

export default function Dashboard() {
  return (
    <div className="min-h-screen p-10 bg-[#FEF9E1]">
      <h1 className="text-4xl font-bold text-[#771D32] text-center mb-10">
        Dashboard
      </h1>
      <div className="space-y-8">
        <AddExpense />
        <SplitExpense />
      </div>
    </div>
  );
}
