import * as React from "react";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useDarkTheme } from "../../hooks/useDarkTheme";




interface CommentProps {
    title : string,
    description : string
}


const Comment: React.FC<CommentProps> = ({title , description}) => {
   const {darkTheme} = useDarkTheme()
   return (
 
         <ListItem alignItems="flex-start">
            <ListItemText
            sx={{color :darkTheme ? 'white' : 'black' , flexWrap : 'pre-wrap' }}
               primary={title}
               secondary={
                  <React.Fragment>
                     <Typography
                     dangerouslySetInnerHTML={{__html : description}}
                        sx={{ display: "inline" , flexWrap : 'pre-wrap' }}
                        component="span"
                        variant="body2"
                        color={darkTheme ? 'white' : 'black'}
                     >
                     </Typography>
                  </React.Fragment>
               }
            />
         </ListItem>

   );
};
export default Comment