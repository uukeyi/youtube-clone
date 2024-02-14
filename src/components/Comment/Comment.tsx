import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";




interface CommentProps {
    title : string,
    description : string
}


const Comment: React.FC<CommentProps> = ({title , description}) => {
   return (
 
         <ListItem alignItems="flex-start">
            {/* <ListItemAvatar>
               <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar> */}
            <ListItemText
               primary={title}
               secondary={
                  <React.Fragment>
                     <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                     >
                       {description}
                     </Typography>
                     {/* {" — I'll be in your neighborhood doing errands this…"} */}
                  </React.Fragment>
               }
            />
         </ListItem>

   );
};
export default Comment