//for signup
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import bgImage from "../../assets/Images/bg_Home.png";
import SummaryApi from "../../common";
import { useTheme } from "../../context/ThemeContext";

export default function SignUp() {
  const { themeColor, themeHeader } = useTheme();
  const navigate = useNavigate();
  const sitekey = "6Lf27jsqAAAAAFJwjVqSCy7RhtIumUCinrU9hher";
  const captchaRef = useRef();
  const [initialLoginValues, setInitialLoginValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    reCaptcha: "",
  });

  const validationSchema = yup.object({
    username: yup
      .string()
      .required("Username is required")
      .min(3, "Username must be 3 charactor"),
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
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password"), null], 'Must match "password" field value'),
    reCaptcha: yup.string().required("Please complete the reCAPTCHA"),
  });

  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: initialLoginValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (
        values.email &&
        values.username &&
        values.password &&
        values.reCaptcha != ""
      ) {
        try {
          const response = await fetch(SummaryApi.signUp.url, {
            method: SummaryApi.signUp.method,
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(values),
          });
          const dataApi = await response.json();
          if (dataApi.success) {
            toast.success(`${dataApi.message}`);
            navigate("/dashboard/signIn");
          }
          if (dataApi.error) {
            toast.error(`${dataApi.message}`);
          }
        } catch (error) {
          // Handle the error here
          console.error("Registration failed:", error.message);
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
      <div className="hidden invisible md:visible md:flex md:w-[50%] lg:w-[62%] bg-gray-300 md:relative">
        <img
          src={bgImage}
          className="h-[70%] mt-[15%] lg:mt-[10%] lg:h-[85%] mx-auto bg-no-repeat bg-fixed bg-center bg-contain"
          alt="background image"
        />
      </div>
      <div className="bg-white w-full md:w-[50%] lg:w-[38%] h-auto relative flex">
        <div className="relative mt-10 md:mt-16 mb-8 w-full sm:w-4/5 p-5 sm:p-0 sm:mx-[10%]">
          <div className="flex flex-col relative">
            <h1 className="text-2xl font-bold text-gray-600 flex items-center">
              Welcome to SignUp Page! 👋🏻
            </h1>
            <p className="text-sm text-left mt-2 text-gray-600">
              Please sign-up to your account
            </p>
          </div>
          <div className="relative mt-8 sm:mt-4">
            <form onSubmit={formik.handleSubmit}>
              <div className="sm:col-span-4 w-full">
                <label
                  htmlFor="username"
                  className="block text-sm mb-2 font-medium leading-6"
                  style={{
                    color:
                      formik.touched.username && formik.errors.username
                        ? "red"
                        : isUsernameFocused
                        ? themeColor
                        : "gray",
                  }}
                >
                  Username
                </label>
                <div>
                  <input
                    type="username"
                    name="username"
                    id="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={() => setIsUsernameFocused(false)}
                    onFocus={() => setIsUsernameFocused(true)}
                    className="text-gray-700 w-full border border-gray-400 outline-none focus:border-none hover:border-gray-500 outline rounded-lg bg-transparent py-1.5 pl-1 placeholder:text-gray-500 sm:text-sm sm:leading-6"
                    style={{
                      outline: isUsernameFocused
                        ? `2px solid ${themeColor}`
                        : "",
                    }}
                    placeholder="Enter username"
                  />
                </div>
                {formik.touched.username && formik.errors.username ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.username}
                  </div>
                ) : null}
              </div>
              <div className="sm:col-span-4 w-full mt-4">
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
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
              <div className="sm:col-span-4  w-full mt-4">
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
              <div className="sm:col-span-4  w-full mt-4">
                <label
                  htmlFor="password"
                  className="block text-sm mb-2 font-medium leading-6"
                  style={{
                    color:
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                        ? "red"
                        : isConfirmPasswordFocused
                        ? themeColor
                        : "gray",
                  }}
                >
                  Confirm Password
                </label>
                <div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={() => setIsConfirmPasswordFocused(false)}
                    onFocus={() => setIsConfirmPasswordFocused(true)}
                    className="text-gray-700 w-full border border-gray-400 focus:border-none hover:border-gray-500 rounded-lg bg-transparent py-1.5 pl-1 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    style={{
                      outline: isConfirmPasswordFocused
                        ? `2px solid ${themeColor}`
                        : "",
                    }}
                    placeholder="********"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute mx-auto mt-[1.1rem] text-gray-500 right-[3.5%] bg-transparent transform -translate-y-1/2 focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </button>
                </div>
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.confirmPassword}
                  </div>
                ) : null}
              </div>
              <div className="mt-4">
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
                Sign Up
              </button>
            </form>
          </div>
          <div className="relative top-10 sm:top-6 mb-6 flex justify-center items-center gap-3">
            <span className="text-gray-600">Already have an account? </span>
            <Link to="/dashboard/signIn">
              <span className="text-indigo-500 font-semibold cursor-pointer">
                Sign In
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
