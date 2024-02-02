import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
   const [darkTheme, setDarkTheme] = useState(false);
   return (
      <ThemeContext.Provider
         value={{ isDarkTheme: darkTheme, setDarkTheme: setDarkTheme }}
      >
         {children}
      </ThemeContext.Provider>
   );
};
