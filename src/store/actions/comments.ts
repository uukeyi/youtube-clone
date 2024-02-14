import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICommentsResponse } from "../../interfaces/commentsResponse";
import axios from "axios";

interface getComments {
   videoId: string;
   part: string;
}
export const getComments = createAsyncThunk<
   ICommentsResponse,
   getComments,
   { rejectValue: string }
>("commentsSlice/getComments", async (params, { rejectWithValue }) => {
   try {
      const response = await axios<ICommentsResponse>({
         method: "GET",
         url: "https://www.googleapis.com/youtube/v3/commentThreads",
         params: {
            part: params.part,
            videoId: params.videoId,
            key : process.env.REACT_APP_API_KEY
         },
      });
      console.log(response.data)
      return response.data;
   } catch (error: any) {
    console.log(error)

      return rejectWithValue(error.message);
   }
});
