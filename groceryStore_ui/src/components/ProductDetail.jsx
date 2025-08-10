// product detail page
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../common";
import { useTheme } from "../context/ThemeContext";
import DisplayCurrency from "../common/DisplayCurrency";
import RecommendedProduct from "./RecommendedProduct";
import Context from "../context";
import AddToCart from "../common/AddToCart";

function ProductDetail() {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const params = useParams();
  const { themeColor, themeHeader } = useTheme();
  const [activeImage, setActiveImage] = useState("");

  const { fetchUserAddToCart } = useContext(Context);
  const handleAddToCart = async (e, id) => {
    await AddToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchProductDetail = async () => {
    const response = await fetch(SummaryApi.productDetail.url, {
      method: SummaryApi.productDetail.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });
    const dataResponse = await response.json();
    setData(dataResponse?.data);
    setActiveImage(dataResponse?.data?.productImage[0]);
  };

  useEffect(() => {
    if (params.id) {
      fetchProductDetail();
    }
  }, [params.id]);

  const handleImage = (imageUrl) => {
    setActiveImage(imageUrl);
  };

  const discount = ((data?.price - data?.sellingPrice) / data?.price) * 100;

  return (
    <div
      className={`relative max-w-[85rem] min-h-screen px-4 py-12 sm:px-6 lg:px-8 lg:py-10 mx-auto bg-gray-300 ${
        themeHeader === "fixed" ? "top-10 lg:top-16 mb-10 lg:mb-14" : ""
      }`}
    >
      <div className="container mx-auto p-6">
        <div className=" flex flex-col md:flex-row gap-4">
          <div className="flex gap-4 md:flex-col overflow-scroll scrollbar-none h-full">
            {data.productImage.map((imageUrl, index) => {
              return (
                <div
                  className="h-20 w-20 bg-slate-200 rounded p-1"
                  style={{
                    border:
                      activeImage === imageUrl
                        ? `2px solid ${themeColor}`
                        : "none",
                  }}
                  kay={imageUrl}
                >
                  <img
                    src={imageUrl}
                    className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                    onClick={() => handleImage(imageUrl)}
                  />
                </div>
              );
            })}
          </div>
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 p-1">
            <img
              src={activeImage}
              className="h-full w-full object-scale-down mix-blend-multiply"
            />
          </div>
          <div className="flex flex-col gap-2 w-[90%] md:w-[50%]">
            <p className="w-20 text-center bg-red-200 text-red-600 font-medium px-2 py-1 rounded-full">
              {data?.brandName}
            </p>
            <p className="text-2xl lg:text-4xl font-semibold text-slate-700 w-full">
              {data?.productName}
            </p>
            <p className="text-xl lg:text-2xl font-medium text-slate-500">
              {data?.category}
            </p>
            <div className="flex items-center gap-4 text-2xl font-medium">
              <p className="text-red-600">
                {DisplayCurrency(data?.sellingPrice)}
              </p>
              <p className="text-slate-500 line-through">
                {DisplayCurrency(data?.price)}
              </p>
            </div>
            <div className="flex gap-4">
              <p className="text-slate-500 text-xl font-semibold">Discount: </p>
              <p className="text-green-600 text-xl font-bold ">
                {discount.toFixed(1)}%
              </p>
            </div>
            <div
              className="w-40 text-white px-2 py-1 flex items-center justify-center text-xl font-medium rounded-full transform active:translate-y-1 cursor-pointer"
              style={{ backgroundColor: themeColor }}
              onClick={(e) => handleAddToCart(e, data?._id)}
            >
              Add to cart
            </div>
          </div>
        </div>
        <div className="mt-4 w-[90%] md:w-[80%] mx-auto">
          <p className="text-2xl text-slate-600 font-semibold mb-2">
            Description:
          </p>
          <div className="h-40 rounded-md overflow-y-scroll p-2 bg-slate-300 border-2 border-black">
            {data?.description}
          </div>
        </div>
      </div>
      <RecommendedProduct categoryName={data?.category} />
    </div>
  );
}

export default ProductDetail;
