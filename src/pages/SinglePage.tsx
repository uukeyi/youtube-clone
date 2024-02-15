import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxToolkit";
import { useNavigate, useParams } from "react-router-dom";
import { getData, getSingleVideo } from "../store/actions/data";
import { Box, CardMedia, IconButton, Typography } from "@mui/material";
import { useDarkTheme } from "../hooks/useDarkTheme";
import { getChannel } from "../store/actions/channel";
import MediaCard from "../components/MediaCard/MediaCard";
import { useInView } from "react-intersection-observer";
import { addComment, getComments } from "../store/actions/comments";
import Comment from "../components/Comment/Comment";
import List from "@mui/material/List";
import { Input } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
const SinglePage: React.FC = () => {
   const { id } = useParams();
   const dispatch = useAppDispatch();
   const [inputValue, setInputValue] = useState("");
   const { singleVideo, errorInfo, media } = useAppSelector(
      (state) => state.data
   );
   const {
      comments,
      error: errorComments,
      errorMessage: errorMessageComments,
      pageToken: pageTokenComments,
   } = useAppSelector((state) => state.comments);
   const [rendered, setRendered] = useState(false);
   const [maxResultsComments, setMaxResultsComments] = useState("20");
   const {
      channel,
      error: errorChannel,
      errorMessage: errorMessageChannel,
   } = useAppSelector((state) => state.channelData);
   const [popup, setPopup] = useState(false);
   const { darkTheme } = useDarkTheme();
   const pageToken = JSON.parse(
      localStorage.getItem("nextPageToken") as string
   );
   const { inView, ref } = useInView({
      threshold: 0,
   });
   const { inView: inViewComments, ref: refComments } = useInView({
      threshold: 0,
   });
   useEffect(() => {
      if (id) {
         dispatch(getSingleVideo({ id: id }));
      }
      if (window.innerWidth <= 1200) {
         setMaxResultsComments("5");
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
         dispatch(
            getComments({
               part: "snippet",
               videoId: singleVideo[0].id,
               newRequest: true,
               pageToken: pageTokenComments,
               maxResults: maxResultsComments,
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
      if (inViewComments && rendered) {
         dispatch(
            getComments({
               part: "snippet",
               videoId: singleVideo[0].id,
               newRequest: false,
               pageToken: pageTokenComments,
               maxResults: maxResultsComments,
            })
         );
      }
   }, [inViewComments]);
   useEffect(() => {
      if (errorInfo.isError) {
         alert(`Error : ${errorInfo.value}`);
      }
      if (errorChannel) {
         alert(`Error Channel : ${errorMessageChannel}`);
      }
      if (errorComments) {
         alert(`Error Comments : ${errorMessageComments}`);
      }
   }, [errorInfo.isError, errorChannel, errorComments]);
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
                        fontSize: {
                           xs: "11px",
                           sm: "14px",
                        },
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
                           sx={{
                              display: "flex",
                              flexDirection: "column",
                              fontSize: {
                                 xs: "11px",
                                 sm: "14px",
                              },
                           }}
                           component={"span"}
                        >
                           {singleVideo[0].snippet.description.slice(0, 100)}

                           <Typography
                              component={"span"}
                              onClick={() => setPopup(true)}
                              sx={{
                                 cursor: "pointer",
                                 fontSize: {
                                    xs: "11px",
                                    sm: "14px",
                                 },
                              }}
                           >
                              More...
                           </Typography>
                        </Typography>
                     ) : (
                        <Typography
                           sx={{
                              display: "flex",
                              flexDirection: "column",
                              fontSize: {
                                 xs: "11px",
                                 sm: "14px",
                              },
                           }}
                           component={"span"}
                        >
                           {singleVideo[0].snippet.description}
                           <br />
                           <br />

                           {popup ? (
                              <Typography
                                 component={"span"}
                                 onClick={() => setPopup(false)}
                                 sx={{
                                    cursor: "pointer",
                                    fontSize: {
                                       xs: "11px",
                                       sm: "14px",
                                    },
                                 }}
                              >
                                 Close...
                              </Typography>
                           ) : null}
                        </Typography>
                     )}
                  </Typography>
               ) : null}
               <Box sx={{ position: "relative" }}>
                  <Input
                     disableUnderline={true}
                     style={{
                        marginTop: "20px",
                        width: "100%",
                        borderBottom: `1px solid ${
                           darkTheme ? "white" : "black"
                        }`,
                        color: darkTheme ? "white" : "black",
                        caretColor: darkTheme ? "white" : "black",
                     }}
                     value={inputValue}
                     placeholder="Write comment"
                     onChange={(e) => {
                        setInputValue(e.target.value);
                     }}
                  />
                  <IconButton
                     sx={{
                        color: darkTheme ? "white" : "black",
                        position: "absolute",
                        right: "0px",
                        top: "14px",
                     }}
                     onClick={() => {
                        if (
                           localStorage.getItem("tokenYoutube") &&
                           inputValue
                        ) {
                           dispatch(
                              addComment({
                                 value: inputValue,
                                 videoId: singleVideo[0].id,
                              })
                           );
                           setInputValue('')
                        }
                     }}
                  >
                     <CheckIcon />
                  </IconButton>
               </Box>

               <List
                  sx={{
                     width: "100%",
                     maxWidth: 360,
                  }}
               >
                  {comments
                     ? comments.map((comment) => {
                          return (
                             <Comment
                                key={comment.id}
                                title={
                                   comment.snippet.topLevelComment.snippet
                                      .authorDisplayName
                                }
                                description={
                                   comment.snippet.topLevelComment.snippet
                                      .textDisplay
                                }
                             />
                          );
                       })
                     : null}
                  <Box
                     sx={{
                        display: {
                           xs: "none",
                           lg: "block",
                        },
                     }}
                     ref={refComments}
                  ></Box>
                  <Typography
                     onClick={() => {
                        dispatch(
                           getComments({
                              part: "snippet",
                              videoId: singleVideo[0].id,
                              newRequest: false,
                              pageToken: pageTokenComments,
                              maxResults: maxResultsComments,
                           })
                        );
                     }}
                     sx={{
                        color: darkTheme ? "white" : "black",
                        paddingLeft: "16px",
                        display: {
                           xs: "block",
                           lg: "none",
                        },
                     }}
                  >
                     More...
                  </Typography>
               </List>
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
