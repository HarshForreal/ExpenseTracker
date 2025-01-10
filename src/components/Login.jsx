import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://expense-tracker-qn11.vercel.app/api/users/list")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Failed to fetch users:", error));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://expense-tracker-qn11.vercel.app/api/auth/login",
        {
          email,
          password,
        }
      );
      console.log("Login Response:", response.data);

      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/dashboard");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-b from-[#771D32] via-[#E65758] to-white flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-[#771D32] text-center mb-8">
          Welcome Back
        </h1>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-[#A31D1D] focus:border-[#A31D1D]"
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-[#A31D1D] focus:border-[#A31D1D]"
              placeholder="********"
            />
          </div>

          {error && <p className="text-center text-red-500 mb-4">{error}</p>}

          <div className="flex items-center justify-between mb-6">
            <a href="#" className="text-sm text-[#A31D1D] hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-[#6D2323] hover:bg-[#A31D1D] text-[#E5D0AC] font-semibold py-3 rounded-lg flex justify-center items-center"
          >
            Login
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>

          <p className="text-center mt-6 text-sm text-gray-600">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-[#A31D1D] font-semibold hover:underline"
            >
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
