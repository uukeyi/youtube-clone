import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/reduxToolkit";
import { getData } from "../store/actions/data";
import MediaCard from "../components/MediaCard/MediaCard";
import Button from "@mui/material/Button";
import { useDarkTheme } from "../hooks/useDarkTheme";

import { useInView } from "react-intersection-observer";
const MainPage = () => {
   const dispatch = useAppDispatch();
   const { darkTheme } = useDarkTheme();
   const { media, pageToken, errorInfo } = useAppSelector(
      (store) => store.data
   );
   const { inView, ref } = useInView({
      threshold : 0
   });

   useEffect(() => {
      if (inView) {
         dispatch(
            getData({
               chart: "mostPopular",
               maxResults: "15",
               pageToken: pageToken,
            })
         );
      }
   }, [inView]);
   useEffect(() => {
      if (errorInfo.isError) {
         alert(`Error : ${errorInfo.value}`);
      }
   }, [errorInfo.isError]);
   console.log(inView);

   return (
      <Box
         sx={{
            padding: {
               xs: "30px",
               sm: "70px",
            lg : '100px'
            },
         }}
      >
         <Box sx={{ display: "flex", gap: "10px", mb: "30px" , justifyContent : {
            sm : 'center',
            md : 'left'
         } }}>
            {[
               {
                  title: "Animals",
               },
               {
                  title: "Games",
               },
               {
                  title: "Travel",
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
                        fontSize : {
                           xs : '12px',
                           md : '14px'
                        }
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
         <div ref={ref}></div>
      </Box>
   );
};
export default MainPage;
