// render all product detail (all related page)
import React from "react"
import { useTheme } from "../context/ThemeContext"
import CategoryList from "./CategoryList"
import BannerProduct from "./BannerProduct"
import AllProduct from "./AllProduct"

function Product() {
  const { themeHeader } = useTheme()

  return (
    <div
      className={`max-w-[85rem] min-h-screen relative px-4 py-12 sm:px-6 lg:px-8 lg:py-6 mx-auto bg-gray-300 ${
        themeHeader === "fixed" ? "top-12 lg:top-16 mb-10 lg:mb-14" : ""
      }`}
    >
      <CategoryList />
      <BannerProduct />
      <AllProduct />
    </div>
  );
}

export default Product;
