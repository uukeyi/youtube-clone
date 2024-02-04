import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IThumbnailsObject } from "../../interfaces/mediaResponse";
import { useDarkTheme } from "../../hooks/useDarkTheme";
interface MediaCardProps {
   thumbnails: IThumbnailsObject;
   title: string;

   channelTitle: string;
}

const MediaCard: React.FC<MediaCardProps> = ({
   thumbnails,
   title,
   channelTitle,
}) => {
   const { darkTheme } = useDarkTheme();

   return (
      <Card
         sx={{
            cursor: "pointer",
            boxShadow: "none",
            transition: "0.7s",
            background: darkTheme ? "#28282B" : "",
         }}
      >
         <CardMedia
            sx={{ height: 200, objectFit: "cover", borderRadius: "10px" }}
            image={thumbnails.maxres.url}
            title="green iguana"
         />
         <CardContent sx={{ padding: "10px" }}>
            {/* <Typography gutterBottom variant="h5" component="div">
     Lizard
   </Typography> */}
            <Typography
               color="black"
               sx={{ fontWeight: "500", fontSize: "16px"  , color : darkTheme ? 'white' : 'black' , transition: "0.7s"}}
            >
               {title.length > 50 ? title.substring(0, 45) + "..." : title}
            </Typography>
            <Typography
               color="black"
               sx={{ fontWeight: "400", fontSize: "14px", mt: "5px" , color : darkTheme ? 'white' : 'black' , transition: "0.7s" }}
            >
               {/* {title.length > 90 ? title.substring(0, 85) + "..." : title} */}
               {channelTitle}
            </Typography>
         </CardContent>
      </Card>
   );
};
export default MediaCard;
