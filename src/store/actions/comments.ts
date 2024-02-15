import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICommentsResponse } from "../../interfaces/commentsResponse";
import axios from "axios";
import { IGetCommentsReturn } from "../../interfaces/commentsResponse";
interface IGetComments {
   videoId: string;
   part: string;
   newRequest: boolean;
   pageToken: string;
   maxResults?: string;
}
interface IAddComment  {
   value : string,
   videoId : string
}
export const getComments = createAsyncThunk<
   IGetCommentsReturn,
   IGetComments,
   { rejectValue?: string }
>("commentsSlice/getComments", async (params, { rejectWithValue }) => {
   try {
      const response = await axios<ICommentsResponse>({
         method: "GET",
         url: "https://www.googleapis.com/youtube/v3/commentThreads",
         params: {
            part: params.part,
            videoId: params.videoId,
            key: process.env.REACT_APP_API_KEY,
            pageToken: params.pageToken,
            maxResults: params.maxResults,
         },
      });
      // console.log(response.data);
      return { newRequest: params.newRequest, comments: response.data };
   } catch (error: any) {
      // console.log(error);

      return rejectWithValue(error.message);
   }
});

export const addComment = createAsyncThunk<any , IAddComment , {rejectValue? : string}>(
   "commentsSlice/addComment",
   async (params, { rejectWithValue }) => {
      try {
         const response = await axios({
            method: "POST",
            url: "https://www.googleapis.com/youtube/v3/commentThreads",
            data: {
               snippet: {
                  topLevelComment: {
                     snippet: {
                        textOriginal: params.value,
                     },
                  },
                  videoId : params.videoId
               },
            },
            params : {
               part : "snippet",
               key : process.env.REACT_APP_API_KEY,
            },
            headers : {
               Authorization : `Bearer ${localStorage.getItem('tokenYoutube')}`,
            Accept : 'application/json',
            "Content-Type" : "application/json"
            
            }
         });
    
      return response.data
      } catch (error : any) {

         return rejectWithValue(error.message)
      }
   }
);
