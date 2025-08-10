//for product according to category
import React, { useState, useEffect, useContext } from "react";
import SummaryApi from "../common";
import DisplayCurrency from "../common/DisplayCurrency";
import AddToCart from "../common/AddToCart";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Context from "../context";

const CategoryProduct = () => {
  const { themeColor, themeHeader } = useTheme();
  const [allProduct, setAllProduct] = useState([]);
  const params = useParams();

  const { fetchUserAddToCart } = useContext(Context);
  const handleAddToCart = async (e, id) => {
    await AddToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();

    console.log("product data", dataResponse);

    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  const filteredProducts = params.categoryName
    ? allProduct.filter((product) => product.category === params.categoryName)
    : allProduct;

  return (
    <div
      className={`relative max-w-[85rem] min-h-screen px-4 py-12 sm:px-6 lg:px-4 lg:py-8 mx-auto bg-gray-300 ${
        themeHeader === "fixed" ? "top-10 lg:top-16 mb-10 lg:mb-14" : ""
      }`}
    >
      <div className="py-2 px-6 flex justify-between items-center">
        <h2 className="font-bold text-xl text-slate-700 capitalize">
          {params.categoryName
            ? `${params.categoryName} Product`
            : "All Products"}
        </h2>
      </div>
      <div className="px-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-2">
        {filteredProducts.map((product) => (
          <Link
            key={product._id}
            to={`/dashboard/product/${product._id}`}
            className="max-w-[100rem] relative px-2 py-4 sm:px-2 lg:px-2 lg:py-2 mx-auto bg-gray-300"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <a className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800">
              <div className="p-4 md:p-5 cursor-pointer">
                <div className="flex justify-between items-center gap-x-3">
                  <div className="grow">
                    <div className="flex-col items-center gap-x-3">
                      <img
                        src={product.productImage[0]}
                        className="w-4/5 mx-auto group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out"
                        alt={product.productName}
                      />
                    </div>
                    <div className="mt-1 flex flex-col mx-2">
                      <h2 className="text-gray-500 font-medium">
                        {product.brandName}
                      </h2>
                      <p className="text-lg font-bold text-slate-700">
                        {product.productName}
                      </p>
                      <div className="flex gap-3">
                        <p className="text-lg font-bold text-red-400">
                          {DisplayCurrency(product.sellingPrice)}
                        </p>
                        <p className="text-lg font-bold text-slate-500 line-through">
                          {DisplayCurrency(product.price)}
                        </p>
                      </div>
                      <p className="text-base font-bold text-green-600">
                        <span className="text-slate-500 mr-2">Save:</span>
                        {(
                          ((product.price - product.sellingPrice) /
                            product.price) *
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
        ))}
      </div>
    </div>
  );
};

export default CategoryProduct;
