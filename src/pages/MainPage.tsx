import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/reduxToolkit";
import { getData } from "../store/actions/data";
import MediaCard from "../components/MediaCard/MediaCard";
import Button from "@mui/material/Button";
import { useDarkTheme } from "../hooks/useDarkTheme";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
const MainPage = () => {
   const dispatch = useAppDispatch();
   const { darkTheme } = useDarkTheme();
   const { media,  errorInfo } = useAppSelector(
      (store) => store.data
   );
   const { inView, ref } = useInView({
      threshold: 0,
   });
   const [videoCategory, setVideoCategory] = useState(null);
   const navigate = useNavigate();
   const pageToken = JSON.parse(localStorage.getItem('nextPageToken') as string)
   useEffect(() => {
      if (videoCategory) {
         dispatch(
            getData({
               chart: "mostPopular",
               maxResults: "15",
               pageToken: pageToken,
               videoCategoryId: videoCategory,
               newRequest: true,
            })
         );
      } else if (videoCategory === "") {
         dispatch(
            getData({
               chart: "mostPopular",
               maxResults: "15",
               newRequest: true,
            })
         );
      }
   }, [videoCategory]);

   useEffect(() => {
      if (inView) {
         if (videoCategory) {
            dispatch(
               getData({
                  chart: "mostPopular",
                  maxResults: "15",
                  pageToken: pageToken,
                  newRequest: false,
                  videoCategoryId: videoCategory,
               })
            );
         } else {
            dispatch(
               getData({
                  chart: "mostPopular",
                  maxResults: "15",
                  pageToken: pageToken,
                  newRequest: false,
               })
            );
         }
      }
   }, [inView]);

   useEffect(() => {
      if (errorInfo.isError) {
         alert(`Error : ${errorInfo.value}`);
      }
   }, [errorInfo.isError]);

   return (
      <Box
         sx={{
            padding: {
               xs: "30px",
               sm: "70px",
               lg: "150px",
            },
         }}
      >
         <Box
            onClick={(e: any) => {
               setVideoCategory(e.target.dataset.id);
            }}
            sx={{
               display: "flex",
               gap: "10px",
               mb: "30px",
               justifyContent: {
                  sm: "center",
                  md: "left",
               },
               flexWrap: "wrap",
            }}
         >
            {[
               {
                  title: "All",
                  id: "",
               },
               {
                  title: "Animals",
                  id: 15,
               },
               {
                  title: "Games",
                  id: 20,
               },
               {
                  title: "Science",
                  id: 28,
               },
               {
                  title: "Comedy",
                  id: 23,
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
                        fontSize: {
                           xs: "12px",
                           md: "14px",
                        },
                     }}
                     data-id={btn.id}
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
            onClick={(e: any) => {
               navigate(`singlePage/${e.target.dataset.id}`);
            }}
         >
            {media.map((el, index) => {
               return (
                  <MediaCard
                     id = {el.id}
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
