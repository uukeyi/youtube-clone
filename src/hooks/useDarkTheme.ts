
import ThemeContext from "../contexts/themeContext";
import { IThemeContext } from "../contexts/themeContext";
import { useContext } from "react";
export const useDarkTheme = () => {
    return useContext<IThemeContext>(ThemeContext)
}