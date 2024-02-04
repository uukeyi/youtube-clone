import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import MovieIcon from "@mui/icons-material/Movie";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AccountCircle from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { IconButton } from "@mui/material";
import { useDarkTheme } from "../../hooks/useDarkTheme";

interface SideBarProps {
   isOpen: boolean;
   setState: Function;
}

interface SideBarProps {}

export const SideBar: React.FC<SideBarProps> = ({ isOpen, setState }) => {
   const toggleDrawer = (openProps: boolean) => (event: any) => {
      if (
         event.type === "keydown" &&
         (event.key === "Tab" || event.key === "Shift")
      ) {
         return;
      }

      setState(openProps);
   };
   const { darkTheme, setDarkTheme } = useDarkTheme();

   const list = () => (
      <Box
         role="presentation"
         onClick={toggleDrawer(false)}
         onKeyDown={toggleDrawer(false)}
         style={{
            background: darkTheme ? "#28282B" : "white",
            height: "100%",
         }}
      >
         <Box
            sx={{
               display: {
                  xs: "flex",
                  sm: "none",
               },
               width: "100%",
               justifyContent: "center",
            }}
         >
            <IconButton
               onClick={() => {
                  if(setDarkTheme) {
                     setDarkTheme(!darkTheme);

                  }
               }}
               color="inherit"
            >
               <DarkModeIcon
                  style={{ color: darkTheme ? "white" : "black" }}
                  fontSize="large"
               />
            </IconButton>

            <IconButton color="inherit">
               <AccountCircle
                  style={{ color: darkTheme ? "white" : "black" }}
                  fontSize="large"
               />
            </IconButton>
         </Box>
         <List>
            {[
               { title: "Trending", icon: <WhatshotIcon /> },
               { title: "Music", icon: <LibraryMusicIcon /> },
               { title: "Films", icon: <MovieIcon /> },
               { title: "Sports", icon: <EmojiEventsIcon /> },
            ].map((el, index) => (
               <ListItem key={index} disablePadding>
                  <ListItemButton>
                     <ListItemIcon
                        style={{ color: darkTheme ? "white" : "black" }}
                     >
                        {el.icon}
                     </ListItemIcon>
                     <ListItemText
                        style={{ color: darkTheme ? "white" : "black" }}
                        primary={el.title}
                     />
                  </ListItemButton>
               </ListItem>
            ))}
         </List>
         <Divider />
      </Box>
   );

   return (
      <div>
         <React.Fragment key={"left"}>
            <Drawer anchor={"left"} open={isOpen} onClose={toggleDrawer(false)}>
               {list()}
            </Drawer>
         </React.Fragment>
      </div>
   );
};
