// Admin user page
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { IoCloseCircleSharp } from "react-icons/io5";
import productCategory from "../../Components/ProductList";
import { FaCloudUploadAlt } from "react-icons/fa";
import UploadImage from "../../components/UploadImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../../common";
import { toast } from "react-toastify";

function Admin() {
  const navigate = useNavigate();
  const { themeColor, setShowUser } = useTheme();
  const user = useSelector((state) => state?.user?.user);
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const [uploadProductImageInput, setUploadProductImageInput] = useState("");

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    setUploadProductImageInput(file.name);
    console.log("file", file);
    const uploadImageCloudinary = await UploadImage(file);
    setData((preve) => {
      return {
        ...preve,
        productImage: [...preve.productImage, uploadImageCloudinary.url],
      };
    });
    console.log("upload image", uploadImageCloudinary.url);
  };

  const handleDeleteProductImage = async (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((preve) => {
      return {
        ...preve,
        productImage: [...newProductImage],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(SummaryApi.uploadProduct.url, {
      method: SummaryApi.uploadProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (responseData.success) {
      toast.success(responseData?.message);
      navigate("/dashboard");
    }
    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen bg-gray-300 bg-opacity-50 z-50">
      <div
        className="w-[90%] md:w-[80%] lg:w-[60%] rounded-lg mx-auto px-2 relative top-28 bg-white text-gray-700 flex flex-col items-center justify-center shadow-lg shadow-black h-[450px]"
        style={{ border: `2px solid ${themeColor}` }}
      >
        <button
          className="block mt-2 ml-auto transform active:translate-y-1 font-semibold"
          onClick={() => setShowUser(false)}
        >
          <IoCloseCircleSharp className="text-4xl" />
        </button>
        <div className="overflow-y-scroll w-[80%]">
          <p className="font-bold text-2xl mb-3" style={{ color: themeColor }}>
            Profile Details :
          </p>
          <div
            className="w-full p-5 mb-5 flex flex-col gap-1 rounded-md"
            style={{ border: `2px solid ${themeColor}` }}
          >
            <p className="font-semibold text-lg">Name: {user?.username}</p>
            <p className="font-semibold text-lg">Email: {user?.email}</p>
            <p className="font-semibold text-lg">Role: {user?.role}</p>
          </div>
          <div
            className="w-full p-5 mb-5 flex flex-col gap-3 rounded-md"
            style={{ border: `2px solid ${themeColor}` }}
          >
            <p className="font-bold text-2xl" style={{ color: themeColor }}>
              Add Product :
            </p>
            <form
              className="grid p-4 gap-2 font-semibold"
              onSubmit={handleSubmit}
            >
              <label htmlFor="productName">Product Name:</label>
              <input
                type="text"
                id="productName"
                name="productName"
                placeholder="Enter product name..."
                value={data.productName}
                onChange={handleOnChange}
                className="p-1 border-2 bg-slate-200 border-gray-300 hover:border-gray-500 rounded-lg"
                required
              />
              <label htmlFor="brandName">Brand Name:</label>
              <input
                type="text"
                id="brandName"
                name="brandName"
                placeholder="Enter Brand name..."
                value={data.brandName}
                onChange={handleOnChange}
                className="p-1 border-2 bg-slate-200 border-gray-300 hover:border-gray-500 rounded-lg"
                required
              />
              <label htmlFor="category">Category :</label>
              <select
                required
                value={data.category}
                name="category"
                onChange={handleOnChange}
                className="p-1 border-2 bg-slate-200 border-gray-300 hover:border-gray-500 rounded-lg"
              >
                <option value={""}>Select Category</option>
                {productCategory.map((el, index) => {
                  return (
                    <option value={el.value} key={el.value + index}>
                      {el.label}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="productImage">Product Image :</label>
              <label htmlFor="uploadImageInput">
                <div className="p-2 bg-slate-200 border rounded h-32 w-full cursor-pointer">
                  <div className="text-slate-400 flex flex-col items-center justify-center">
                    <FaCloudUploadAlt className="text-6xl" />
                    <p>Upload Product Image</p>
                    <input
                      type="file"
                      id="uploadImageInput"
                      className="hidden"
                      onChange={handleUploadProduct}
                      required
                    />
                  </div>
                </div>
              </label>
              <div>
                {data?.productImage[0] ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {data.productImage.map((el, index) => {
                      return (
                        <div className="relative group">
                          <img
                            src={el}
                            alt="image"
                            width={100}
                            height={100}
                            className="bg-slate-200 border"
                          ></img>
                          <div
                            className="absolute bottom-0 right-0 p-1 text-white bg-red-500 rounded-full hidden group-hover:block cursor-pointer"
                            onClick={() => handleDeleteProductImage(index)}
                          >
                            <MdDelete />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-red-400 text-xs">
                    *Please upload product image
                  </p>
                )}
              </div>
              <label htmlFor="price" className="mt-3">
                Price:
              </label>
              <input
                type="number"
                id="price"
                placeholder="Enter price..."
                name="price"
                value={data.price}
                onChange={handleOnChange}
                className="p-1 border-2 bg-slate-200 border-gray-300 hover:border-gray-500 rounded-lg"
                required
              />
              <label htmlFor="sellingPrice" className="mt-3">
                Selling Price:
              </label>
              <input
                type="number"
                id="sellingPrice"
                placeholder="Enter selling price..."
                name="sellingPrice"
                value={data.sellingPrice}
                onChange={handleOnChange}
                className="p-1 border-2 bg-slate-200 border-gray-300 hover:border-gray-500 rounded-lg"
                required
              />
              <label htmlFor="description" className="mt-3">
                Description:
              </label>
              <textarea
                className="h-20 bg-slate-200 border-2 border-gray-300 rounded-lg p-1 resize-none"
                placeholder="Give some description about product"
                onChange={handleOnChange}
                name="description"
              ></textarea>
              <button
                type="submit"
                className="px-3 py-2 text-white mt-6 rounded-md transform active:translate-y-1"
                style={{ backgroundColor: themeColor }}
              >
                Upload Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
