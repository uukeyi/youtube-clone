import { ThemeContext } from "../contexts/themeContext";
import { useContext } from "react";
export const useDarkTheme = () => {
    return useContext(ThemeContext)
}