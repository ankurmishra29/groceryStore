//for reset
import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useFormik } from "formik"
import * as yup from "yup"
import { useTheme } from "../../context/ThemeContext"
import { toast } from "react-toastify"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import bgImage from "../../assets/Images/bg_Home.png"
import SummaryApi from "../../common"

export default function ResetPassword() {
  const { themeColor, themeHeader } = useTheme()
  const navigate = useNavigate()
  const { token } = useParams()
  const [initialLoginValues, setInitialLoginValues] = useState({
    password: "",
  })

  const validationSchema = yup.object({
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':?/>.<,]).*$/,
        "Password must contain at least:\nOne Uppercase letter\nOne Lowercase letter\nOne Number\nOne Special character"
      ),
  })

  const [isPasswordFocused, setIsPasswordFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const formik = useFormik({
    initialValues: initialLoginValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (values.password != "") {
        try {
          const response = await fetch(`${SummaryApi.resetUser.url}/${token}`, {
            method: SummaryApi.resetUser.method,
            credentials: "include",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(values),
          })
          console.log(response)
          const dataApi = await response.json()
          if (dataApi.success) {
            toast.success(`${dataApi.message}`)
            navigate("/dashboard/signIn")
          }
          if (dataApi.error) {
            toast.error(`${dataApi.message}`)
          }
        } catch (error) {
          console.error("Reset Password failed", error.message)
        }
      }
    },
  })

  return (
    <div
      className={`relative bg-gray-400 w-full md:flex-row md:flex overflow-y-hidden'
      ${themeHeader === "fixed" ? "top-16 h-full lg:top-8 mb-6" : ""}`}
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
              Welcome to Reset Password Page! 👋🏻
            </h1>
            <p className="text-sm text-left mt-2 text-gray-600">
              Please enter your new password
            </p>
          </div>
          <div className="relative mt-8 sm:mt-4">
            <form onSubmit={formik.handleSubmit}>
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
                  New Password
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
              <button
                type="submit"
                className=" mt-6 h-1/6 w-full p-1.5 rounded-lg text-white font-bold transform active:translate-y-1 active:bg-indigo-400 "
                style={{ backgroundColor: themeColor }}
              >
                Reset
              </button>
            </form>
            <div className="flex gap-1 justify-center items-center mt-5 font-bold">
              <Link to="/dashboard/signIn">
                <p
                  className="text-sm text-indigo-500 flex items-center"
                  style={{ color: themeColor }}
                >
                  <span className="rotate-180 block mt-1">&#10148</span> Back
                  to Login
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
