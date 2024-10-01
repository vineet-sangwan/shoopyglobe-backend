import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa"; // Import react-icons
import { registerUser } from "../Redux/authSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fullname, setfullName] = useState("");
  const [username, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* function to dispatch an action to register user */
  const handleregister = (e) => {
    e.preventDefault(); // Prevent default form submission
    const userData = { fullname, username, email, password };
    /* dispatch action when user submits form data to register */
    dispatch(registerUser(userData));
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex flex-col items-center">
          {/* ShoopyGlobe Logo Section */}
          <div className="flex items-center bg-gray-800 px-6 py-3 rounded-md mb-4 shadow-lg">
            <div className="text-white text-2xl font-bold">
              <span className="text-yellow-500">S</span>hoopy
            </div>
            <FaShoppingBag className="h-8 w-8 text-white mx-2" />{" "}
            {/* React Icon */}
            <div className="text-white text-2xl font-bold">
              <span className="text-yellow-500">G</span>lobe
            </div>
          </div>
          <h2 className="text-center text-3xl font-bold text-white">
            Sign up to your account
          </h2>
        </div>

        {/* Register Form */}
        <div className="bg-white bg-opacity-30 backdrop-blur-md p-8 rounded-md shadow-lg">
          <form className="space-y-6" onSubmit={handleregister}>
            <div>
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-white"
              >
                Full Name
              </label>
              <input
                id="fullname"
                name="fullname"
                type="text"
                placeholder="Full Name"
                value={fullname}
                onChange={(e) => setfullName(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 bg-white bg-opacity-70 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 shadow-md"
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-white"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setuserName(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 bg-white bg-opacity-70 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 shadow-md"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 bg-white bg-opacity-70 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 shadow-md"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 bg-white bg-opacity-70 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 shadow-md"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-500 focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-white">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-yellow-500 font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
