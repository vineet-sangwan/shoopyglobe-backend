import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./redux/store";
import React from "react";
import App from "./App.jsx";
import "./index.css";
import "./App.css";

// Importing components
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import NotFound from "./components/Notfound.jsx";
import Cart from "./components/Cart.jsx";
import ProductList from "./components/Productlist.jsx";
import Checkout from "./components/CheckOut.jsx";
import OrderConfirmation from "./components/OrderConfirmation.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";

// Lazy loading the ProductDetail component
const ProductDetail = React.lazy(() =>
  import("./components/ProductDetails.jsx")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // This can be wrapped with other elements like Layout if needed
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "*", element: <NotFound /> },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/orderConfirmation",
        element: <OrderConfirmation />,
      },
      {
        path: "/products",
        element: <ProductList />,
      },
      {
        path: "/products/:productId",
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <ProductDetail />
          </React.Suspense>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
