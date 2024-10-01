import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Redux/authSlice"; // Import the loginUser thunk
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa"; // Import react-icons
import { getCartItems } from "../Redux/cartSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.auth.userId);
  const { isAuthenticated, error } = useSelector((state) => state.auth); // Get authentication status and error from state

  /* Handle login action */
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission
    const userData = { email, password };
    // Dispatch the loginUser thunk with user credentials
    dispatch(loginUser(userData));
  };

  // Redirect to dashboard if login is successful
  useEffect(() => {
    if (isAuthenticated) {
      alert("login success");
      navigate("/"); // Redirect after login
      dispatch(getCartItems(user));
    }
  }, [isAuthenticated, navigate, dispatch]);

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
            Log in to your account
          </h2>
        </div>

        {/* Login Form */}
        <div className="bg-white bg-opacity-30 backdrop-blur-md p-8 rounded-md shadow-lg">
          <form className="space-y-6" onSubmit={handleLogin}>
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
                Log In
              </button>
            </div>
          </form>

          {error && (
            <p className="mt-4 text-center text-sm text-red-500">
              {error} {/* Display error message if login fails */}
            </p>
          )}

          <p className="mt-6 text-center text-sm text-white">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-yellow-500 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>

          <p className="mt-4 text-center text-sm text-yellow-400">
            Forgot your password?{" "}
            <Link
              to="/reset-password"
              className="text-yellow-500 font-semibold hover:underline"
            >
              Reset it here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
