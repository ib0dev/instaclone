import { createContext, useEffect, useState } from "react"

const DEFAULT_THEME = "system"

const initialState = {
  theme: DEFAULT_THEME,
  changeTheme: () => {},
}

export const ThemeContext = createContext(initialState)

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(DEFAULT_THEME)

  const value = {
    theme,
    changeTheme: (selectedTheme) => {
      setTheme(selectedTheme)
    },
  }

  useEffect(() => {
    const root = document.documentElement

    const applyTheme = (themeValue) => {
      if (themeValue === "dark") {
        root.classList.add("dark")
        root.classList.remove("light")
        root.setAttribute("data-theme", "dark")
      } else if (themeValue === "light") {
        root.classList.add("light")
        root.classList.remove("dark")
        root.setAttribute("data-theme", "light")
      } else {
        const systemDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches
        root.classList.toggle("dark", systemDark)
        root.classList.toggle("light", !systemDark)
        root.setAttribute("data-theme", systemDark ? "dark" : "light")
      }
    }

    applyTheme(theme)
  }, [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeContextProvider
