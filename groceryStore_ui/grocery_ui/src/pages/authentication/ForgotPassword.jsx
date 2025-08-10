// forgot page
import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useTheme } from "../../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../../assets/Images/bg_Home.png";
import SummaryApi from "../../common";

export default function ForgotPassword() {
  const { themeColor, themeHeader } = useTheme();
  const navigate = useNavigate();
  const [initialLoginValues, setInitialLoginValues] = useState({
    email: "",
  });

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const [isEmailFocused, setIsEmailFocused] = useState(false);

  const formik = useFormik({
    initialValues: initialLoginValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (values.email != "") {
        try {
          const dataResponse = await fetch(SummaryApi.forgotUser.url, {
            method: SummaryApi.forgotUser.method,
            credentials: "include",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(values),
          });

          const dataApi = await dataResponse.json();
          console.log(dataApi);
          if (dataApi.status) {
            toast.success(`${dataApi.message}`);
            alert("please check you email to reset your password..");
            navigate("/dashboard/signIn");
          } else {
            toast.error(`${dataApi.message}`);
          }
        } catch (err) {
          console.error("Forgot passsword failed:", err.message);
        }
      }
    },
  });

  return (
    <div
      className={`relative bg-gray-400 w-full md:flex-row md:flex overflow-y-hidden
    ${themeHeader === "fixed" ? "top-16 h-full lg:top-16 mb-10" : ""}`}
    >
      <div className="hidden invisible md:visible md:flex md:w-[50%] lg:w-[62%] h-screen bg-gray-300 md:relative">
        <img
          src={bgImage}
          className="h-[70%] mt-[15%] lg:mt-[10%] lg:h-[85%] mx-auto bg-no-repeat bg-fixed bg-center bg-contain"
          alt="background image"
        />
      </div>
      <div className="bg-white w-full md:w-[50%] lg:w-[38%] h-screen relative flex">
        <div className="relative my-10 md:my-auto w-full sm:w-4/5 p-5 sm:p-0 sm:mx-[10%]">
          <div>
            <h2 className="text-2xl font-bold text-left text-gray-600">
              Forgot Password 🔒
            </h2>
            <p className="text-sm text-left mt-2 text-gray-400">
              Enter your email...
            </p>
          </div>
          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            <div className="mt-5">
              <label
                htmlFor="email"
                className="block text-sm font-medium focus:ring-blue-600 mb-2"
                style={{
                  color:
                    formik.touched.email && formik.errors.email
                      ? "red"
                      : isEmailFocused
                      ? themeColor
                      : "gray",
                }}
              >
                Email
              </label>
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={() => setIsEmailFocused(false)}
                  onFocus={() => setIsEmailFocused(true)}
                  className="text-gray-700 w-full border border-gray-400 outline-none focus:border-none hover:border-gray-500 outline rounded-lg bg-transparent py-1.5 pl-1 placeholder:text-gray-500 sm:text-sm sm:leading-6"
                  style={{
                    outline: isEmailFocused ? `2px solid ${themeColor}` : "",
                  }}
                  placeholder="Enter your email"
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>

            <button
              type="submit"
              className="w-full py-1 px-4 text-gray-100 font-semibold rounded-md active:bg-indigo-400 transition duration-100 active:translate-y-1"
              style={{ backgroundColor: themeColor }}
            >
              Send Reset Link
            </button>
          </form>

          <div className="flex gap-1 justify-center items-center mt-5 font-bold">
            <Link to="/dashboard/signIn">
              <p
                className="text-sm text-indigo-500 flex items-center"
                style={{ color: themeColor }}
              >
                <span className="rotate-180 block mt-1">&#10148;</span> Back to
                Login
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
