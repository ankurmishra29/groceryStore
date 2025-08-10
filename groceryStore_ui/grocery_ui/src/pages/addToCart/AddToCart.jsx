// add to cart page
import React, { useEffect, useState, useContext } from "react";
import { useTheme } from "../../context/ThemeContext";
import SummaryApi from "../../common";
import DisplayCurrency from "../../common/DisplayCurrency";
import { MdDelete } from "react-icons/md";
import Context from "../../context";

function AddToCart() {
  const { themeColor, themeHeader } = useTheme();
  const [data, setData] = useState([]);
  const context = useContext(Context);

  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const responseData = await response.json();
    if (responseData.success) {
      setData(responseData.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });
    const responseData = await response.json();
    if (responseData.success) {
      fetchData();
    }
  };

  const decreaseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });
      const responseData = await response.json();
      if (responseData.success) {
        fetchData();
      }
    }
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });
    const responseData = await response.json();
    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  const totalPrice = data.reduce(
    (prev, curr) => prev + curr.quantity * curr?.productId?.sellingPrice,
    0
  );

  return (
    <div
      className={`relative w-full min-h-screen mb-4 bg-gray-300 text-black top-4 ${
        themeHeader === "fixed" ? "top-24 lg:top-20 mb-10 lg:mb-14" : ""
      }`}
    >
      <div className="container mx-auto px-4 pb-12">
        <div className="text-center text-xl font-bold">
          {data.length === 0 && (
            <p className="bg-white italic p-5 text-red-500">No item !</p>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-[60%] flex flex-col gap-4">
            {data.map((product) => (
              <div
                key={product?._id}
                className="w-full bg-white h-32 border border-slate-300 rounded flex"
              >
                <div className="w-40 h-full bg-slate-200 flex-shrink-0">
                  <img
                    src={product?.productId?.productImage[0]}
                    className="w-full h-full object-scale-down mix-blend-multiply"
                    alt={product?.productId?.productName}
                  />
                </div>
                <div className="px-4 flex w-full relative">
                  <div
                    className="absolute right-2 cursor-pointer text-red-600 rounded-full p-2 hover:bg-red-400 hover:text-white"
                    onClick={() => deleteCartProduct(product?._id)}
                  >
                    <MdDelete />
                  </div>
                  <div className="py-2 relative w-full">
                    <h2 className="text-xl font-semibold text-slate-700 line-clamp-1">
                      {product?.productId?.productName}
                    </h2>
                    <p className="capitalize text-slate-500">
                      {product?.productId?.category}
                    </p>
                    <div className="flex items-center justify-between my-1">
                      <p className="text-red-400 font-semibold">
                        {DisplayCurrency(product?.productId?.sellingPrice)}
                      </p>
                      <p className="text-slate-500 font-semibold">
                        {DisplayCurrency(
                          product?.productId?.sellingPrice * product?.quantity
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        className="border border-red-600 text-red-600 w-6 h-6 flex justify-center items-center hover:bg-red-600 hover:text-white rounded"
                        onClick={() =>
                          decreaseQty(product?._id, product?.quantity)
                        }
                      >
                        -
                      </button>
                      <span>{product?.quantity}</span>
                      <button
                        className="border border-red-600 text-red-600 w-6 h-6 flex justify-center items-center hover:bg-red-600 hover:text-white rounded"
                        onClick={() =>
                          increaseQty(product?._id, product?.quantity)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full md:w-[40%] p-4 h-64 bg-white flex flex-col mb-20">
            <h2 className="text-white bg-red-600 px-4 py-1 text-center font-bold">
              Total Summary
            </h2>
            <div className="mt-2">
              <p className="py-1 px-auto font-bold text-slate-800">
                Quantity Of Product:
              </p>
              <p className="font-bold text-xl text-slate-700 py-1">
                {totalQty}
              </p>
            </div>
            <div className="mt-2">
              <p className="py-1 px-auto font-bold text-slate-800">
                Total Price:
              </p>
              <p className="font-bold text-xl text-slate-700 py-1">
                {DisplayCurrency(totalPrice)}
              </p>
            </div>
            <button
              className="mt-2 font-bold text-white rounded-lg px-4 py-1 active:transform translate-y-1"
              style={{ backgroundColor: themeColor }}
            >
              Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddToCart;
