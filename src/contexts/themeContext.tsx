import React from "react";
import { createContext, useState } from "react";
export interface IThemeContext {
   darkTheme: boolean;
   setDarkTheme?: Function;
}
interface IThemeProviderProps {
   children?: React.ReactNode;
}

const ThemeContext = createContext<IThemeContext>({
   darkTheme: true,
});
export const ThemeProvider: React.FC<IThemeProviderProps> = ({ children }) => {
   const [darkTheme, setDarkTheme] = useState(true);

   return (
      <ThemeContext.Provider
         value={{ darkTheme: darkTheme, setDarkTheme: setDarkTheme }}
      >
         {children}
      </ThemeContext.Provider>
   );
};
export default ThemeContext;

