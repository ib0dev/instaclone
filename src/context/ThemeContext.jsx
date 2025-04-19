import { createContext, useEffect, useState } from "react";

const DEFAULT_THEME = "system";

const initialState = {
  theme: DEFAULT_THEME,
  changeTheme: () => {},
};

export const ThemeContext = createContext(initialState);

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(DEFAULT_THEME);

  const value = {
    theme,
    changeTheme: (selectedTheme) => {
      setTheme(selectedTheme);
    },
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else if (theme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      const systemDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.documentElement.classList.toggle("dark", systemDark);
      document.documentElement.classList.toggle("light", !systemDark);
    }
    console.log("Setting class on html:", document.documentElement.className);

  }, [theme]);
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
