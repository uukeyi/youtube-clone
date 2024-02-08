import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useState } from "react";
import { useDarkTheme } from "../../hooks/useDarkTheme";
import { Search } from "@mui/icons-material";
import { Input } from "@mui/material";
import { SideBar } from "../SideBar/SideBar";
import { useNavigate } from "react-router-dom";

export default function Header() {
   const [isOpenSideBar, setIsOpenSideBar] = useState(false);
   const { darkTheme, setDarkTheme } = useDarkTheme();
   const [inputValue, setInputValue] = useState("");
   const navigate = useNavigate();

   return (
      <Box>
         <SideBar isOpen={isOpenSideBar} setState={setIsOpenSideBar} />
         <AppBar
            style={{
               background: darkTheme ? "#28282B" : "white",
               transition: "0.7s",
               boxShadow: "none",
            }}
            position="static"
         >
            <Toolbar
               style={{
                  color: darkTheme ? "white" : "black",
                  display: "flex",
                  justifyContent: "space-between",
               }}
            >
               <div style={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                     size="large"
                     edge="start"
                     color="inherit"
                     aria-label="menu"
                     sx={{
                        mr: {
                           xs: 0,
                           sm: 1,
                        },
                     }}
                     onClick={() => {
                        setIsOpenSideBar(true);
                     }}
                  >
                     <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" component="div">
                     Youtube
                  </Typography>
               </div>

               <div
                  style={{
                     display: "flex",
                     alignItems: "center",
                     width: "45%",
                     position: "relative",
                  }}
               >
                  <Input
                     disableUnderline={true}
                     style={{
                        width: "100%",
                        borderBottom: `1px solid ${
                           darkTheme ? "white" : "black"
                        }`,
                        color: darkTheme ? "white" : "black",
                        caretColor: darkTheme ? "white" : "black",
                     }}
                     value={inputValue}
                     placeholder="Type something.."
                     onChange={(e) => {
                        setInputValue(e.target.value);
                     }}
                  />
                  <IconButton
                     style={{ position: "absolute", right: "0px" }}
                     color="inherit"
                     onClick={(e) => {
                        if (inputValue) {
                        
                           navigate(`/search/${inputValue}`);
                        }
                     }}
                  >
                     <Search />
                  </IconButton>
               </div>

               <Box
                  sx={{
                     display: {
                        xs: "none",
                        sm: "flex",
                     },
                     alignItems: "center",
                  }}
               >
                  <IconButton
                     onClick={() => {
                        if (setDarkTheme) {
                           setDarkTheme(!darkTheme);
                        }
                     }}
                     color="inherit"
                  >
                     <DarkModeIcon />
                  </IconButton>

                  <IconButton color="inherit">
                     <AccountCircle />
                  </IconButton>
               </Box>
            </Toolbar>
         </AppBar>
      </Box>
   );
}
