//for search
import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import SummaryApi from "../../common";
import { useTheme } from "../../context/ThemeContext";
import DisplayCurrency from "../../common/DisplayCurrency";
import { Link } from "react-router-dom";
import AddToCart from "../addToCart/AddToCart";
import Context from "../../context";

const SearchProduct = () => {
  const query = useLocation();
  const { fetchUserAddToCart } = useContext(Context);
  const { themeHeader, themeColor } = useTheme();
  const [data, setData] = useState([]);
  console.log("query", query.search);

  const handleAddToCart = async (e, id) => {
    const result = await AddToCart(e, id);
    if (result.success) {
      fetchUserAddToCart();
    }
  };

  const fetchProduct = async () => {
    const response = await fetch(SummaryApi.searchProduct.url + query.search);
    const dataResponse = await response.json();
    setData(dataResponse.data);
  };

  useEffect(() => {
    fetchProduct();
  }, [query]);

  return (
    <div
      className={`relative max-w-[85rem] min-h-screen px-4 py-12 sm:px-6 lg:px-4 lg:py-10 mx-auto bg-gray-300 ${
        themeHeader === "fixed" ? "top-10 lg:top-16 mb-10 lg:mb-14" : ""
      }`}
    >
      <div className="container mx-auto p-4">
        <p className="text-slate-700 text-xl font-bold mb-2">
          Search Result : {data.length}
        </p>
        {data.length === 0 && (
          <p className="bg-white text-lg text-center p-4 rounded text-rose-500 italic">
            No match found...
          </p>
        )}
        {data.length !== 0 && (
          <div className="px-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-2">
            {data.map((product, index) => {
              return (
                <Link
                  to={"/dashboard/product/" + product?._id}
                  className="max-w-[100rem] relative px-2 py-4 sm:px-2 lg:px-2 lg:py-2 mx-auto bg-gray-300"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  <a
                    className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800"
                    href="#"
                  >
                    <div className="p-4 md:p-5 cursor-pointer">
                      <div className="flex justify-between items-center gap-x-3">
                        <div className="grow">
                          <div classNameName="flex-col items-center gap-x-3">
                            <img
                              src={product?.productImage[0]}
                              className="w-4/5 mx-auto group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out"
                            />
                          </div>
                          <div className="mt-1 flex flex-col mx-2">
                            <h2 className="text-gray-500 font-medium">
                              {product?.brandName}
                            </h2>
                            <p className="text-lg font-bold text-slate-700">
                              {product?.productName}
                            </p>
                            <div className="flex gap-3">
                              <p className="text-lg font-bold text-red-400 ">
                                {DisplayCurrency(product?.sellingPrice)}
                              </p>
                              <p className="text-lg font-bold text-slate-500 line-through">
                                {DisplayCurrency(product?.price)}
                              </p>
                            </div>
                            <p className="text-base font-bold text-green-600">
                              <span className="text-slate-500 mr-2">Save:</span>
                              {(
                                ((product?.price - product?.sellingPrice) /
                                  product?.price) *
                                100
                              ).toFixed(1)}
                              %
                            </p>
                            <button
                              className="text-white py-1 font-medium rounded-full mt-2 transform translate-y-1"
                              style={{ backgroundColor: themeColor }}
                              onClick={(e) => handleAddToCart(e, product?._id)}
                            >
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchProduct;
