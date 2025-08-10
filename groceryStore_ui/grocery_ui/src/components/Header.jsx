//Header page
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import logo from "../assets/Images/logo1.png";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { IoMdLogIn } from "react-icons/io";
import { Tooltip } from "react-tooltip";
import { BsCartPlusFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import { setUserDetails } from "../store/userSlice";
import { useTheme } from "../context/ThemeContext";
import Context from "../context";

function Header() {
  const { themeColor, themeHeader, setShowUser } = useTheme();
  const user = useSelector((state) => state?.user?.user);
  console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useContext(Context);
  const searchInput = useLocation();
  const [search, setSearch] = useState(searchInput?.search.split("=")[1]);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logoutUser.url, {
      method: SummaryApi.logoutUser.method,
      credentials: "include",
    });
    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message);
      navigate("/");
      dispatch(setUserDetails(null));
    } else {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    if (value) {
      navigate(`/dashboard/search?q=${value}`);
    } else {
      navigate("/dashboard/search");
    }
  };

  return (
    <header
      className="p-1 flex w-full h-20 md:h-16 items-center justify-between shadow-md shadow-gray-600 bg-white text-black z-50 border-b-2"
      style={{ position: themeHeader }}
    >
      <div className="w-12 ml-1 md:ml-4 md:w-16 flex md:mr-20">
        <Link to="/dashboard" className="flex items-center h-[100%]">
          <img src={logo} className="h-[100%] w-auto md:h-[86%]" />
          <p
            className="hidden italic md:flex md:text-3xl md:font-bold"
            style={{ color: themeColor }}
          >
            Store
          </p>
        </Link>
        <Tooltip id="logo-tooltip" message="company logo and name" />
      </div>
      <div className="flex w-1/2">
        <div
          className="w-full relative flex items-center h-10 sm:h-10 md:h-[90%] rounded-3xl text-gray-900 border  bg-gray-200"
          style={{ borderColor: themeColor }}
        >
          <input
            type="text"
            placeholder="Search item..."
            className="w-[90%]  px-5 rounded-3xl text-gray-900 outline-none bg-gray-200"
            onChange={handleSearch}
            value={search}
          />
          <div
            className="w-[25%] md:w-[15%] lg:w-[10%] h-auto p-2.5 flex justify-center rounded-r-3xl"
            style={{ backgroundColor: themeColor }}
          >
            <button className="text-white text-xl">
              <FaSearch />
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {user?._id ? (
          <>
            {user?.role === "ADMIN" ? (
              <div
                className="bg-red-500 font-semibold text-white py-0.5 px-0.5 md:px-1 flex justify-center rounded-lg ml-3 cursor-pointer transform active:translate-y-1"
                onClick={() => setShowUser(true)}
              >
                <IoPersonCircleOutline className="text-3xl md:text-3xl" />
              </div>
            ) : (
              <div
                className="font-semibold text-white py-0.5 px-0.5 md:px-1 flex justify-center rounded-lg ml-3 cursor-pointer transform active:translate-y-1"
                style={{ backgroundColor: themeColor }}
                onClick={() => setShowUser(true)}
              >
                <IoPersonCircleOutline className="text-3xl md:text-3xl" />
              </div>
            )}
            <div
              className="font-semibold text-white py-0.5 px-0.5 md:px-1 flex justify-center rounded-lg cursor-pointer transform active:translate-y-1"
              style={{ backgroundColor: themeColor }}
              onClick={handleLogout}
            >
              <IoMdLogOut className="text-3xl md:text-3xl" />
              <p className="hidden md:flex text-lg md:text-xl md:ml-1">
                Logout
              </p>
            </div>
          </>
        ) : (
          <Link to="/dashboard/signIn">
            <div
              className="font-semibold text-white py-0.5 px-0.5 md:px-1 flex justify-center rounded-lg ml-3 cursor-pointer transform active:translate-y-1"
              style={{ backgroundColor: themeColor }}
            >
              <IoMdLogIn className="text-3xl md:text-3xl" />
              <p className="hidden md:flex text-lg md:text-xl md:ml-1">Login</p>
            </div>
          </Link>
        )}
        <div className="text-4xl md:text-3xl mr-4 md:mr-8 cursor-pointer font-semibold ">
          <Link
            to="/dashboard/addToCart"
            className="flex items-center text-gray-600"
          >
            <BsCartPlusFill />
            {user?._id && (
              <div className="absolute top-3 lg:top-1.5 right-2 md:right-16 rounded-full h-6 md:h-5 p-2 bg-red-500 text-white flex items-center justify-center text-xs md:text-sm">
                {context?.cartProductCount}
              </div>
            )}
            <p className="hidden md:flex text-lg md:text-xl md:ml-1 text-gray-600">
              Cart
            </p>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
