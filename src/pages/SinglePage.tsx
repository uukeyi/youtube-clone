import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxToolkit";
import { useParams } from "react-router-dom";
import { getSingleVideo } from "../store/actions/data";
import { Box, CardMedia, Typography } from "@mui/material";
import { useDarkTheme } from "../hooks/useDarkTheme";
import { getChannel } from "../store/actions/channel";

interface SinglePageProps {}

const SinglePage: React.FC<SinglePageProps> = () => {
   const { id } = useParams();
   const dispatch = useAppDispatch();
   const { singleVideo, errorInfo } = useAppSelector((state) => state.data);
   const {
      channel,
      error: errorChannel,
      errorMessage: errorMessageChannel,
   } = useAppSelector((state) => state.channelData);
   const { darkTheme } = useDarkTheme();
   useEffect(() => {
      if (id) {
         dispatch(getSingleVideo({ id: id }));
      }
   }, []);
   useEffect(() => {
      if (singleVideo.length) {
         dispatch(getChannel({ id: singleVideo[0].snippet.channelId }));
      }
   }, [singleVideo]);
   useEffect(() => {
      if (errorInfo.isError) {
         alert(`Error : ${errorInfo.value}`);
      }
      if (errorChannel) {
         alert(`Error Channel : ${errorMessageChannel}`);
      }
   }, [errorInfo.isError, errorChannel]);
   return singleVideo[0] && channel[0] ? (
      <Box
         sx={{
            padding: {
               xs: "30px",
               sm: "70px",
               lg: "100px",
            },
            paddingTop: {
               lg: "60px",
            },
            display: "flex",
         }}
      >
         <Box sx={{ width: "55%" }}>
            <iframe
               src={`https://www.youtube.com/embed/${singleVideo[0].id}`}
               // src="https://www.youtube.com/embed/KdbDDVcw7qc?rel=0"
               // frameborder="0"
               style={{ width: "100%" }}
               width="640"
               height="480"
            ></iframe>
            <Box
               sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  mt: "20px",
               }}
            >
               <Typography
                  sx={{
                     fontSize: {
                        lg: "27px",
                     },
                     color: darkTheme ? "white" : "black",
                  }}
               >
                  {singleVideo[0].snippet.title}
               </Typography>
               <Box>
                  {/* <CardMedia image={channel[0].snippet.thumbnails.high.url} /> */}
                  {/* <img src={channel[0].snippet.thumbnails.high.url} alt="" /> */}
               </Box>
            </Box>
         </Box>
         <Box></Box>
      </Box>
   ) : null;
};

export default SinglePage;
