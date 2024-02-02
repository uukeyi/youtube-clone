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
import SideBar from "../SideBar/SideBar";
export default function Header() {
   const [isOpenSideBar, setIsOpenSideBar] = useState(false);
   const { isDarkTheme, setDarkTheme } = useDarkTheme();
   return (
      <Box>
         <SideBar isOpen={isOpenSideBar} setState={setIsOpenSideBar} />
         <AppBar
            style={{
               background: isDarkTheme ? "#28282B" : "white",
               transition: "0.7s",
            }}
            position="static"
         >
            <Toolbar
               style={{
                  color: isDarkTheme ? "white" : "black",
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
                           isDarkTheme ? "white" : "black"
                        }`,
                        caretColor: isDarkTheme ? "white" : "black",
                     }}
                  />
                  <IconButton
                     style={{ position: "absolute", right: "0px" }}
                     color="inherit"
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
                           setDarkTheme(!isDarkTheme);
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
