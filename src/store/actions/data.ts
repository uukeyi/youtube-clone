import { createAsyncThunk } from "@reduxjs/toolkit";
import {
   IGetMediaResponse,
   IGetSearchVideoResponse,
   IGetSearchDataReturn
} from "../../interfaces/mediaResponse";
import axios from "axios";
interface IGetMediaParams {
   chart?: string;
   id?: string;
   maxResults?: string | number;
   pageToken?: string;
}
interface IGetSearchParams {
   inputValue: string;
   pageToken : string
   newRequest? : boolean
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
            part: "snippet",
            key: process.env.REACT_APP_API_KEY,
            chart: params.chart,
            maxResults: params.maxResults,
            id: params.id,
            pageToken: params.pageToken,
         },
      });



      return response.data;
   } catch (error: any) {


      return rejectWithValue(error.message);
   }
});

export const getSearch = createAsyncThunk<
   IGetSearchDataReturn,
   IGetSearchParams,
   { rejectValue?: string }
>("dataSlice/getSearch", async (params, { rejectWithValue }) => {
   try {
      const response = await axios<IGetSearchVideoResponse>({
         url: "https://www.googleapis.com/youtube/v3/search",
         method: "GET",
         params: {
            part: "snippet",
            key: process.env.REACT_APP_API_KEY,
            q: params.inputValue,
            type: "video",
            maxResults : '15',
            pageToken : params.pageToken
         },
      });
      return {newRequest : params.newRequest !== undefined ? params.newRequest : true  , data : response.data}
   } catch (error: any) {
      return rejectWithValue(error.message);
   }
});
