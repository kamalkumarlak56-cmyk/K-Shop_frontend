
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar.jsx"
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx"
import Verify from "./pages/verify.jsx";
import Verifymail from "./pages/verifymail.jsx";
import Deals from "./pages/Deals.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Products from "./pages/Products.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Profile from "./pages/Profile.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <><Navbar /><Home /></>
  },
  {
    path: "/deals",
    element: <><Navbar /><Deals /></>
  },
  {
    path: "/products",
    element: <><Navbar /><Products /></>
  },
  {
    path: "/products/:productId",
    element: <><Navbar /><ProductDetail /></>
  },
  {
    path: "/cart",
    element: <ProtectedRoute><Navbar /><Cart /></ProtectedRoute>
  },
  {
    path: "/wishlist",
    element: <ProtectedRoute><Navbar /><Wishlist /></ProtectedRoute>
  },
  {
    path: "/profile",
    element: <ProtectedRoute><Navbar /><Profile /></ProtectedRoute>
  },
  {
    path: "/signUp",
    element: <SignUp />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/verify",
    element: <Verify />
  },
   {
    path: "/verify/:token",
    element: <Verifymail />
  },
])


const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
