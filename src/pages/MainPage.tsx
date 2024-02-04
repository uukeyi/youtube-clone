import React, { useEffect } from "react";
import { Box, makeStyles } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/reduxToolkit";
import { getData } from "../store/actions/data";
import MediaCard from "../components/MediaCard/MediaCard";
import Button from "@mui/material/Button";
import { useDarkTheme } from "../hooks/useDarkTheme";
const MainPage = () => {
   const dispatch = useAppDispatch();
   const { darkTheme } = useDarkTheme();
   const media = useAppSelector((store) => store.data.media);
   useEffect(() => {
      dispatch(getData({ chart: "mostPopular", maxResults: "15" }));
   }, []);
   return (
      <Box
         sx={{
            padding: {
               xs: "15px",
               sm: "30px",
            },
         }}
      >
         <Box sx={{ display: "flex", gap: "10px", mb: "30px" }}>
            {[
               {
                  title: "Pets & Animals",
               },
               {
                  title: "Games",
               },
               {
                  title: "Travel & Events",
               },
               {
                  title: "Comedy",
               },
            ].map((btn, index) => {
               return (
                  <Button
                     key={index}
                     sx={{
                        background: darkTheme ? "#343434" : "#C8C8C8",
                        "&:hover": {
                           backgroundColor: darkTheme ? "#343434" : "#C8C8C8",
                        },
                     }}
                     variant="contained"
                  >
                     {btn.title}
                  </Button>
               );
            })}
         </Box>
         <Box
            sx={{
               display: "grid",
               gridTemplateColumns: {
                  sm: "1fr 1fr",
                  md: "1fr 1fr 1fr",
                  lg: "repeat(3 , 1fr)",
                  xl: "repeat(4 , 1fr)",
               },
               gap: "15px",
            }}
         >
            {media.map((el, index) => {
               return (
                  <MediaCard
                     key={index}
                     thumbnails={el.snippet.thumbnails}
                     title={el.snippet.title}
                     channelTitle={el.snippet.channelTitle}
                  />
               );
            })}
         </Box>
      </Box>
   );
};
export default MainPage;
