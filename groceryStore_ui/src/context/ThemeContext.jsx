// theme provider
import React, { createContext, useState, useContext } from "react"

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [themeColor, setThemeColor] = useState("#7367f0")
  const [themeHeader, setThemeHeader] = useState("fixed")
  const [showUser, setShowUser] = useState(false)

  return (
    <ThemeContext.Provider
      value={{
        themeColor,
        setThemeColor,
        themeHeader,
        setThemeHeader,
        showUser,
        setShowUser,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
