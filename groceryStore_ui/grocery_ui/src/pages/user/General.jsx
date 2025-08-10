//General user page
import React from "react";
import { useSelector } from "react-redux";
import { useTheme } from "../../context/ThemeContext";
import { IoCloseCircleSharp } from "react-icons/io5";

function General() {
  const { themeColor, setShowUser } = useTheme();
  const user = useSelector((state) => state?.user?.user);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-gray-300 bg-opacity-50 ">
      <div
        className="w-[90%] md:w-[60%] lg:w-[50%] rounded-lg mx-auto py-2 px-2 relative top-40 bg-white text-gray-700 flex flex-col items-center justify-center shadow-lg shadow-black"
        style={{ border: `2px solid ${themeColor}` }}
      >
        <button
          className="block mt-2 ml-auto transform active:translate-y-1 font-semibold"
          onClick={() => setShowUser(false)}
        >
          <IoCloseCircleSharp className="text-4xl" />
        </button>
        <p className="font-bold text-2xl mb-5" style={{ color: themeColor }}>
          Profile Details :
        </p>
        <div
          className=" max-w-fit p-5 mb-5 flex flex-col gap-4 rounded-md"
          style={{ border: `2px solid ${themeColor}` }}
        >
          <p className="font-semibold text-xl">Name: {user?.username}</p>
          <p className="font-semibold text-xl">Email: {user?.email}</p>
          <p className="font-semibold text-xl">Role: {user?.role}</p>
        </div>
      </div>
    </div>
  );
}

export default General;
