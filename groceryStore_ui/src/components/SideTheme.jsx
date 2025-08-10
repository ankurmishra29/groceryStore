//theme page
import { useState } from "react"
import { IoMdSettings } from "react-icons/io"
import { useTheme } from "../context/ThemeContext"

export default function SideTheme() {
  const [showTheme, setShowTheme] = useState(false)
  const { themeColor, setThemeColor, themeHeader, setThemeHeader } = useTheme()
  const [activeColor, setActiveColor] = useState(themeColor)
  const [activeHeader, setActiveHeader] = useState(themeHeader)

  const handleColorClick = (color) => {
    setThemeColor(color)
    setActiveColor(color)
  }
  const handleHeaderClick = (header) => {
    setThemeHeader(header)
    setActiveHeader(header)
  }

  const themeColors = [
    {
      id: 1,
      bgColor: "#7367f0",
      disp: "INDIGO_THEME",
    },
    {
      id: 2,
      bgColor: "#00cec3",
      disp: "GREEN_THEME",
    },
    {
      id: 3,
      bgColor: "#1a9bfc",
      disp: "BLUE_Theme",
    },
    {
      id: 4,
      bgColor: "#ff5c8e",
      disp: "RED_THEME",
    },
    {
      id: 5,
      bgColor: "#fb9678",
      disp: "ORANGE_THEME",
    },
  ]

  const themeHeaders = [
    {
      id: 1,
      position: "fixed",
      disp: "Fixed",
    },
    {
      id: 2,
      position: "static",
      disp: "Static",
    },
  ]

  return (
    <div
      className={`fixed left-0 top-28 flex flex-row items-center justify-center transform -translate-x-40 transition-all delay-100 duration-1000 ${
        showTheme && "translate-x-0"
      } `}
    >
      <div
        className={`w-40 h-auto rounded-r-md bg-white bg-opacity-90 border-2 border-gray-500 text-black flex flex-col p-2 gap-2 ${
          showTheme && "shadow-lg shadow-black"
        }`}
      >
        <h1
          className="text-center font-extrabold"
          style={{ color: themeColor }}
        >
          Theme Settings
        </h1>
        <div className="p-2 bg-gray-100 border-2 border-gray-400 rounded-md">
          <h1 className="font-semibold mt-2 ml-2">Colors</h1>
          <div className="flex flex-wrap">
            {themeColors.map((thColor) => (
              <div key={thColor.id} className="m-2">
                <div
                  onClick={() => handleColorClick(thColor.bgColor)}
                  style={{ backgroundColor: thColor.bgColor }}
                  className={`w-10 h-8 rounded-md cursor-pointer border-2 border-gray-400 ${
                    activeColor === thColor.bgColor
                      ? "border-black"
                      : "border-gray-400"
                  } hover:border-gray-600 transform active:translate-y-1`}
                ></div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-2 bg-gray-100 border-2 border-gray-400 rounded-md">
          <h1 className="font-semibold mt-2 ml-2">Header</h1>
          <div className="flex">
            {themeHeaders.map((header) => (
              <div key={header.id} className="m-1">
                <button
                  onClick={() => handleHeaderClick(header.position)}
                  className="h-8 p-1.5 rounded-md flex items-center justify-center font-semibold cursor-pointer border-2 bg-gray-200 border-gray-400 hover:border-gray-600 transform active:translate-y-1"
                  style={{
                    backgroundColor:
                      activeHeader === header.position
                        ? themeColor
                        : "transparent",
                    color: activeHeader === header.position ? "white" : "",
                  }}
                >
                  {header.disp}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="w-12 h-12 rounded-r-md text-white flex items-center justify-center z-50 cursor-pointer shadow-xl shadow-gray-500"
        onClick={() => setShowTheme(!showTheme)}
        style={{ backgroundColor: themeColor }}
      >
        <IoMdSettings className="text-4xl animate-spin" />
      </div>
    </div>
  )
}
