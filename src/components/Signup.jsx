import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://expense-tracker-qn11.vercel.app/api/users/addUser",
        {
          name,
          email,
          password,
        }
      );

      if (response.status === 201) {
        navigate("/login");
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (error) {
      setError("Signup failed. Please try again.");
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-b from-[#771D32] via-[#E65758] to-white flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-[#771D32] text-center mb-8">
          Create an Account
        </h1>
        <form onSubmit={handleSignup}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-[#A31D1D] focus:border-[#A31D1D]"
              placeholder="Your Name"
            />
          </div>

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

          <button
            type="submit"
            className="w-full bg-[#6D2323] hover:bg-[#A31D1D] text-[#E5D0AC] font-semibold py-3 rounded-lg flex justify-center items-center"
          >
            Sign Up
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>

          <p className="text-center mt-6 text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#A31D1D] font-semibold hover:underline"
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
