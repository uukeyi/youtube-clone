import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useState } from "react";
import { useDarkTheme } from "../../hooks/useDarkTheme";
import { Search } from "@mui/icons-material";
import { Input} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

export default function Header() {
   const { darkTheme, setDarkTheme } = useDarkTheme();
   const [inputValue, setInputValue] = useState("");
   const navigate = useNavigate();
   const login = useGoogleLogin({
      onSuccess: tokenResponse => localStorage.setItem(  'tokenYoutube'  ,tokenResponse.access_token),
      scope : 'https://www.googleapis.com/auth/youtube.force-ssl'
    });
   return (
      <Box>
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
                  
                  <Typography
                     onClick={() => navigate("/")}
                     sx={{ cursor: "pointer" }}
                     variant="h6"
                     component="div"
                  >
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
                  <IconButton
             onClick={() => login()}
            
                     color="inherit"
                  >
                     <AccountCircle />
                  </IconButton>
                  {/* <GoogleLogin
                     onSuccess={(credentialResponse) => {
                        console.log(credentialResponse);
                        // @ts-ignore
                        // const info = jwtDecode(credentialResponse.credential)
                        // console.log(info)
                        // localStorage.setItem('credentials' , JSON.stringify(credentialResponse.credential))
                     }}
                     
                     onError={() => {
                        console.log("Login Failed");
                     }}
                  />
                  ; */}
               </Box>
            </Toolbar>
         </AppBar>
      </Box>
   );
}
