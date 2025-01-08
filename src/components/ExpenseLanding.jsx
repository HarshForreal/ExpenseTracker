import {
  ArrowRight,
  PieChart,
  CreditCard,
  TrendingUp,
  Wallet,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

export default function LandingPage() {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleGetStarted = () => {
    navigate("/Login"); // Redirect to the login page
  };

  return (
    <div className="bg-gradient-to-b from-[#771D32] via-[#E65758] to-white h-full">
      {/* Header Section */}
      <header className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-white">Spend.</div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
          <div className="container mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold text-[#FFFFFF] mb-6">
              Track Your{" "}
              <span className="italic font-serif font-thin">Expenses</span> with
              Ease
            </h1>

            <p className="text-xl text-[#F8D7DA] mb-8 max-w-2xl mx-auto">
              Simplify your internship finances and focus on what matters most –
              your learning and growth.
            </p>
            <button
              onClick={handleGetStarted}
              className="bg-[#6D2323] hover:bg-[#A31D1D] text-[#E5D0AC] font-semibold py-3 px-8 rounded-full inline-flex items-center"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-[#FEF9E1] mb-12 decoration-solid underline underline-offset-4">
              Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<PieChart className="h-12 w-12 text-blue-500" />}
                title="Expense Analytics"
                description="Visualize your spending patterns with intuitive charts and graphs."
              />
              <FeatureCard
                icon={<CreditCard className="h-12 w-12  " />}
                title="Budget Planning"
                description="Set and manage budgets to keep your internship expenses in check."
              />
              <FeatureCard
                icon={<TrendingUp className="h-12 w-12 text-purple-500" />}
                title="Trend Tracking"
                description="Identify spending trends and optimize your financial habits."
              />
              <FeatureCard
                icon={<Wallet className="h-12 w-12 text-red-500" />}
                title="Multi-currency Support"
                description="Track expenses in multiple currencies for international internships."
              />
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#FEF9E1] mb-6">
              Ready to Take Control of Your Internship Finances?
            </h2>
            <p className="text-xl text-[#821131] mb-8 max-w-2xl mx-auto">
              Join thousands of interns who are mastering their expense
              management with InternSpend.
            </p>
            <button
              onClick={handleGetStarted}
              className="bg-[#6D2323] hover:bg-[#A31D1D] text-[#E5D0AC] font-semibold py-3 px-8 rounded-full"
            >
              Explore Now
            </button>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="text-black py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-bold mb-4 md:mb-0">Spend.</div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="hover:text-gray-300">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center">
      {icon}
      <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

FeatureCard.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
