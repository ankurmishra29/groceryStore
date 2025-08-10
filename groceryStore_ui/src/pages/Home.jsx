//Home page
import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bgHome from "../assets/Images/bg_Home.png";
import logo from '../assets/Images/logo1.png'

export default function Home() {
  return (
    <div className="bg-gray-400">
      <div className="bg-gray-800 text-white p-16 h-screen flex">
        <div className="flex flex-col justify-center md:w-1/2 gap-5 w-full">
          <div>
            <img src={logo} height={100} width={100}/>
          </div>
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-indigo-500 italic font-bold">
            Grocery Store
          </p>
          <p className="text-xl sm:text-2xl text-white font-semibold">
            Good food, good mood.
          </p>
          <p className="text-sm sm:text-base text-white">
            Fresh and fabulous from farm to table!
          </p>
          <Link to={"/Dashboard"}>
            <button className="bg-indigo-500 rounded-lg text-white p-2 font-semibold w-[60%] sm:w-[40%] md:w-[50%] lg:w-[30%]">
              Order Now &#10148;
            </button>
          </Link>
        </div>
        <div className="hidden md:flex md:w-[50%]">
          <img
            src={bgHome}
            className="bg-no-repeat bg-fixed bg-center object-contain"
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
