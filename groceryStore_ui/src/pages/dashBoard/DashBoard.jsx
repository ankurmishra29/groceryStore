//main page( dashboard )
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import SummaryApi from "../../common";
import Context from "../../context";
import { setUserDetails } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import SideTheme from "../../components/sideTheme";
import { useTheme } from "../../context/ThemeContext";
import Admin from "../user/Admin";
import General from "../user/General";
import CategoryList from "../../components/CategoryList";

export default function DashBoard() {
  const [cartProductCount, setCartProductCount] = useState(0);
  const dispatch = useDispatch();
  const { showUser } = useTheme();
  const user = useSelector((state) => state?.user?.user);

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.currentUser.url, {
      method: SummaryApi.currentUser.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(dataResponse);
    if (!dataResponse.ok) {
      throw new Error(`HTTP error! Status: ${dataResponse.status}`);
    }
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
    console.log("data_user", dataApi);
  };

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: "include",
    });
    console.log("dataResponse:", dataResponse);

    const dataApi = await dataResponse.json();
    console.log("dataApi", dataApi);
    setCartProductCount(dataApi?.data?.count);
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, []);

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails,
          cartProductCount,
          fetchUserAddToCart,
        }}
      >
        <ToastContainer position="top-center" />
        <Header />
        <main>
          <Outlet />
          <SideTheme />
          {showUser ? user?.role === "ADMIN" ? <Admin /> : <General /> : ""}
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}
