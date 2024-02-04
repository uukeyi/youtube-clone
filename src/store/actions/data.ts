import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGetMediaResponse } from "../../interfaces/mediaResponse";
import axios from "axios";
interface IGetMediaParams {
   chart?: string;
   id?: string;
//    myRating?: string;
//    hl?: string;
//    maxHeight?: string | number;
   maxResults?: string | number;
//    maxWidth?: string | number;
//    onBehalfOfContentOwner?: string;
//    regionCode?: string;
//    pageToken?: string;
//    videoCategoryId?: string;
}
export const getData = createAsyncThunk<
   IGetMediaResponse,
   IGetMediaParams,
   { rejectValue?: string }
>("dataSlice/getData", async (params, { rejectWithValue }) => {
   try {
      const response = await axios<IGetMediaResponse>({
         method: "GET",
         url: "https://www.googleapis.com/youtube/v3/videos",
         params: {
            part: 'snippet',
            key: process.env.REACT_APP_API_KEY,
            chart: params.chart,
            maxResults: params.maxResults,
            id: params.id,
            // myRating: params.myRating,
            // hl: params.hl,
            // maxHeight: params.maxHeight,
            // maxWidth: params.maxWidth,
            // onBehalfOfContentOwner: params.onBehalfOfContentOwner,
            // regionCode : params.regionCode,
            // pageToken : params.pageToken,
            // videoCategoryId : params.videoCategoryId
         },
      });
      return response.data;
   } catch (error: any) {
      return rejectWithValue(error.message);
   }
});
