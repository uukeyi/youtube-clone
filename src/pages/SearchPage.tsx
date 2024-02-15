import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxToolkit";
import { getSearch } from "../store/actions/data";
import { Box } from "@mui/material";
import MediaCard from "../components/MediaCard/MediaCard";
import { useInView } from "react-intersection-observer";
const SearchPage = () => {
   const { query } = useParams();
   const dispatch = useAppDispatch();
   const { searchMedia, errorInfo } = useAppSelector(
      (store) => store.data
   );
   const pageToken = JSON.parse(localStorage.getItem('nextPageToken') as string)
   const { inView, ref } = useInView({
      threshold: 0,
   });
   const navigate = useNavigate()
   useEffect(() => {
      dispatch(
         getSearch({
            inputValue: query ? query : "",
            pageToken: pageToken,
            newRequest: true,
         })
      );
   }, [query]);
   useEffect(() => {
      if (inView && searchMedia.length) {
         dispatch(
            getSearch({
               inputValue: query ? query : "",
               newRequest: false,
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
   return (
      <>
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
               alignItems: "center",
               padding: {
                  xs: "30px",
                  sm: "70px",
                  lg: "150px",
               },
            }}
            onClick={(e: any) => {
               navigate(`/singlePage/${e.target.dataset.id}`);
            }}
         >
            {searchMedia.map((el, index) => {
               return (
                  <MediaCard
                     id={el.id.videoId}
                     key={index}
                     thumbnails={el.snippet.thumbnails}
                     title={el.snippet.title}
                     channelTitle={el.snippet.channelTitle}
                  />
               );
            })}
         </Box>
         <div ref={ref}></div>
      </>
   );
};
export default SearchPage;
