// for login
import { useContext, useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import bgImage from "../../assets/Images/bg_Home.png";
import SummaryApi from "../../common";
import Context from "../../context";
import { useTheme } from "../../context/ThemeContext";

export default function SignIn() {
  const { themeColor, themeHeader } = useTheme();
  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);
  const sitekey = "6Lf27jsqAAAAAFJwjVqSCy7RhtIumUCinrU9hher";
  const captchaRef = useRef();
  const [initialLoginValues, setInitialLoginValues] = useState({
    email: "",
    password: "",
    reCaptcha: "",
  });

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':?/>.<,]).*$/,
        "Password must contain at least:\nOne Uppercase letter\nOne Lowercase letter\nOne Number\nOne Special character"
      ),
    reCaptcha: yup.string().required("Please complete the reCAPTCHA"),
  });

  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: initialLoginValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (values.email && values.password && values.reCaptcha != "") {
        try {
          const dataResponse = await fetch(SummaryApi.signIn.url, {
            method: SummaryApi.signIn.method,
            credentials: "include",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(values),
          });

          const dataApi = await dataResponse.json();
          if (dataApi.success) {
            toast.success(`${dataApi.message}`);
            navigate("/dashboard");
            fetchUserDetails();
            fetchUserAddToCart();
          }
          if (dataApi.error) {
            toast.error(`${dataApi.message}`);
          }
        } catch (error) {
          console.error("Login failed:", error.message);
        }
      }
    },
  });

  const handleRecaptchaChange = (value) => {
    formik.setFieldValue("reCaptcha", value);
  };

  useEffect(() => {
    if (formik.isSubmitting) {
      setTimeout(() => {
        captchaRef.current.reset();
      }, 1000);
    }
  }, [formik.isSubmitting]);

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
          <div className="flex flex-col relative">
            <h1 className="text-2xl font-bold text-gray-600 flex items-center">
              Welcome to SignIn Page! 👋🏻
            </h1>
            <p className="text-sm text-left mt-2 text-gray-600">
              Please sign-in to your account
            </p>
          </div>
          <div className="relative top-8 sm:top-4">
            <form onSubmit={formik.handleSubmit}>
              <div className="sm:col-span-4  w-full">
                <label
                  htmlFor="email"
                  className="block text-sm mb-2 font-medium leading-6"
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
                    name="email"
                    id="email"
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
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
              <div className="sm:col-span-4 w-full mt-6">
                <label
                  htmlFor="password"
                  className="block text-sm mb-2 font-medium leading-6"
                  style={{
                    color:
                      formik.touched.password && formik.errors.password
                        ? "red"
                        : isPasswordFocused
                        ? themeColor
                        : "gray",
                  }}
                >
                  Password
                </label>
                <div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={() => setIsPasswordFocused(false)}
                    onFocus={() => setIsPasswordFocused(true)}
                    className="text-gray-700 w-full border border-gray-400 focus:border-none hover:border-gray-500 rounded-lg bg-transparent py-1.5 pl-1 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    style={{
                      outline: isPasswordFocused
                        ? `2px solid ${themeColor}`
                        : "",
                    }}
                    placeholder="********"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute mx-auto mt-[1.1rem] text-gray-500 right-[3.5%] bg-transparent transform -translate-y-1/2 focus:outline-none"
                  >
                    {showPassword ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
              <div className=" mt-6 w-full flex flex-row items-center">
                <Link to="/dashboard/forgotPassword">
                  <span className="block text-indigo-500 font-semibold cursor-pointer">
                    Forgot Password ?
                  </span>
                </Link>
              </div>
              <div className="mt-2">
                <ReCAPTCHA
                  sitekey={sitekey}
                  onChange={handleRecaptchaChange}
                  ref={captchaRef}
                />
                {formik.touched.reCaptcha && formik.errors.reCaptcha ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.reCaptcha}
                  </div>
                ) : null}
              </div>
              <button
                type="submit"
                className=" mt-6 h-1/6 w-full p-1.5 rounded-lg text-white font-bold transform active:translate-y-1 active:bg-indigo-400 "
                style={{ backgroundColor: themeColor }}
              >
                Sign In
              </button>
            </form>
          </div>
          <div className="relative top-16 sm:top-10 flex justify-center items-center gap-3">
            <span className="text-gray-600">New user? </span>
            <Link to="/dashboard/signUp">
              <span className="text-indigo-500 font-semibold cursor-pointer">
                Create an Account
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
