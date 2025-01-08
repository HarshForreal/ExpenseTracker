// import ExpenseLanding from "./components/ExpenseLanding.jsx";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Dashboard from "./components/Dashboard.jsx";
// import Login from "./components/Login.jsx";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<ExpenseLanding />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import ExpenseLanding from "./components/ExpenseLanding.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import Login from "./components/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Signup from "./components/Signup.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ExpenseLanding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
