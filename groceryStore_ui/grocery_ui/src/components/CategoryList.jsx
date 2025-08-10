// for all category show
import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import "../../src/App.css";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function CategoryList() {
  const { themeColor } = useTheme();
  const [categoryProduct, setCategoryProduct] = useState([]);

  const fetchCategoryProduct = async () => {
    const response = await fetch(SummaryApi.categoryProduct.url);
    const dataResponse = await response.json();
    console.log(dataResponse);
    setCategoryProduct(dataResponse.data);
  };
  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="container mx-auto, p-6, bg-gray-300">
      <div className="flex items-center gap-4 justify-evenly overflow-scroll scrollbar-none">
        {categoryProduct.map((product, index) => {
          return (
            <Link
              key={index}
              to={"/dashboard/productCategory/" + product?.category}
              className="cursor-pointer"
            >
              <div
                className="rounded-full p-1"
                style={{ border: `2px solid ${themeColor}` }}
              >
                <div className="w-24 h-24 rounded-full overflow-hidden p-4 bg-slate-100 flex items-center justify-center">
                  <img
                    src={product?.productImage[0]}
                    alt={product?.category}
                    className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                  />
                </div>
              </div>
              <p className="text-center font-medium text-sm md:text-base capitalize">
                {product?.category}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryList;
