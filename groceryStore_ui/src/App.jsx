//page routing
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Product from "./components/Product"
import SignIn from "./pages/authentication/SignIn"
import SignUp from "./pages/authentication/SignUp"
import ForgotPassword from "./pages/authentication/ForgotPassword"
import AddToCart from "./pages/addToCart/AddToCart"
import Home from "./pages/Home"
import SideTheme from "./components/sideTheme"
import ResetPassword from "./pages/authentication/ResetPassword"
import DashBoard from "./pages/dashBoard/DashBoard"
import Admin from "./pages/user/Admin"
import General from "./pages/user/General"
import CategoryProduct from "./components/CategoryProduct"
import ProductDetail from "./components/ProductDetail"
import RecommendedProduct from "./components/RecommendedProduct"
import SearchProduct from "./pages/search/SearchProduct"

export default function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/dashboard",
      element: <DashBoard />,
      children: [
        {
          index: true,
          element: <Product />,
        },
        {
          path: "signIn",
          element: <SignIn />,
        },
        {
          path: "signUp",
          element: <SignUp />,
        },
        {
          path: "forgotPassword",
          element: <ForgotPassword />,
        },
        {
          path: "resetpassword/:token",
          element: <ResetPassword />,
        },
        {
          path: "sideTheme",
          element: <SideTheme />,
        },
        {
          path: "general",
          element: <General />,
        },
        {
          path: "admin",
          element: <Admin />,
        },
        {
          path: "productCategory/:categoryName",
          element: <CategoryProduct />,
        },
        {
          path: "product/:id",
          element: <ProductDetail />,
        },
        {
          path: "search",
          element: <SearchProduct />,
        },
        {
          path: "recommended",
          element: <RecommendedProduct />,
        },
        {
          path: "addToCart",
          element: <AddToCart />,
        },
      ],
    },
  ])
  return (
    <>
      <RouterProvider router={route}></RouterProvider>
    </>
  )
}
