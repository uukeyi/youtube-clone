import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxToolkit";
import { useNavigate, useParams } from "react-router-dom";
import { getData, getSingleVideo } from "../store/actions/data";
import { Box, CardMedia, Typography } from "@mui/material";
import { useDarkTheme } from "../hooks/useDarkTheme";
import { getChannel } from "../store/actions/channel";
import MediaCard from "../components/MediaCard/MediaCard";
import { useInView } from "react-intersection-observer";
interface SinglePageProps {}

const SinglePage: React.FC<SinglePageProps> = () => {
   const { id } = useParams();
   const dispatch = useAppDispatch();
   const { singleVideo, errorInfo, media, pageToken } = useAppSelector(
      (state) => state.data
   );
   const [rendered, setRendered] = useState(false);
   const {
      channel,
      error: errorChannel,
      errorMessage: errorMessageChannel,
   } = useAppSelector((state) => state.channelData);
   const [popup, setPopup] = useState(false);
   const { darkTheme } = useDarkTheme();
   const { inView, ref } = useInView({
      threshold: 0,
   });
   useEffect(() => {
      if (id) {
         dispatch(getSingleVideo({ id: id }));
      }
   }, [id]);
   const navigate = useNavigate();
   useEffect(() => {
      if (singleVideo.length) {
         dispatch(getChannel({ id: singleVideo[0].snippet.channelId }));
         dispatch(
            getData({
               newRequest: true,
               chart: "mostPopular",
               maxResults: "15",
               pageToken: pageToken,
            })
         );
         setRendered(true);
      }
   }, [singleVideo]);
   useEffect(() => {
      if (inView && rendered) {
         dispatch(
            getData({
               newRequest: false,
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
            gap: "20px",
            flexDirection: {
               xs: "column",
               lg: "row",
            },
         }}
      >
         <Box
            sx={{
               width: {
                  xs: "100%",
                  lg: "60%",
               },
            }}
         >
            <iframe
               src={`https://www.youtube.com/embed/${singleVideo[0].id}`}
               style={{ width: "100%", borderRadius: "20px" }}
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
               <Box
                  sx={{
                     display: "flex",
                     alignItems: "center",
                     gap: "14px",
                     cursor: "pointer",
                  }}
               >
                  <Box
                     sx={{
                        width: "55px",
                        height: "55px",
                        borderRadius: "100%",
                        border: "1px solid grey",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                     }}
                  >
                     <CardMedia
                        sx={{
                           width: "45px",
                           height: "45px",
                           // borderRadius: "100%",
                        }}
                     />
                  </Box>

                  <Typography
                     sx={{
                        color: darkTheme ? "white" : "black",
                     }}
                  >
                     {channel[0].snippet.title}
                  </Typography>
               </Box>
               {singleVideo[0].snippet.description ? (
                  <Typography
                     sx={{
                        fontSize: "14px",
                        transition: "0.8s",
                        padding: "35px",
                        background: darkTheme ? "#181818" : "	#E0E0E0",
                        borderRadius: "30px",
                        color: darkTheme ? "white" : "black",
                        whiteSpace: "pre-wrap",
                     }}
                  >
                     {singleVideo[0].snippet.description.length > 100 &&
                     !popup ? (
                        <Typography
                           sx={{ display: "flex", flexDirection: "column" }}
                           component={"span"}
                        >
                           {singleVideo[0].snippet.description.slice(0, 100)}

                           <Typography
                              component={"span"}
                              onClick={() => setPopup(true)}
                              sx={{ cursor: "pointer" }}
                           >
                              More...
                           </Typography>
                        </Typography>
                     ) : (
                        <Typography
                           sx={{ display: "flex", flexDirection: "column" }}
                           component={"span"}
                        >
                           {singleVideo[0].snippet.description}
                           <br />
                           <br />

                           {popup ? (
                              <Typography
                                 component={"span"}
                                 onClick={() => setPopup(false)}
                                 sx={{ cursor: "pointer" }}
                              >
                                 Close...
                              </Typography>
                           ) : null}
                        </Typography>
                     )}
                  </Typography>
               ) : null}
            </Box>
         </Box>
         <Box
            onClick={(e: any) => {
               navigate(`/singlePage/${e.target.dataset.id}`);
            }}
            sx={{
               display: "grid",
               gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                  lg: "1fr",
               },
               gap: {
                  sm: "20px",
               },
            }}
         >
            {media.map((el, index) => {
               return (
                  <MediaCard
                     id={el.id}
                     key={index}
                     thumbnails={el.snippet.thumbnails}
                     title={el.snippet.title}
                     channelTitle={el.snippet.channelTitle}
                  />
               );
            })}

            <Box ref={ref}></Box>
         </Box>
      </Box>
   ) : null;
};

export default SinglePage;
