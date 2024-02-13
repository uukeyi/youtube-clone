import { createAsyncThunk } from "@reduxjs/toolkit";
import {
   IGetMediaResponse,
   IGetSearchVideoResponse,
   IGetSearchDataReturn,
   IGetMediaReturn,

} from "../../interfaces/mediaResponse";

import axios from "axios";
interface IGetMediaParams {
   chart: string;
   id?: string;
   maxResults?: string | number;
   pageToken?: string;
   videoCategoryId?: number | string;
   newRequest: boolean;
}
interface IGetSearchParams {
   inputValue: string;
   pageToken: string;
   newRequest: boolean;
}
interface IGetSingleVideo {
   id: string;
}
export const getData = createAsyncThunk<
   IGetMediaReturn,
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
            videoCategoryId: params.videoCategoryId,
         },
      });

      return { newRequest: params.newRequest, media: response.data };
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
            maxResults: "15",
            pageToken: params.pageToken,
         },
      });
      return {
         newRequest: params.newRequest,
         data: response.data,
      };
   } catch (error: any) {
      return rejectWithValue(error.message);
   }
});

export const getSingleVideo = createAsyncThunk<
   IGetMediaResponse,
   IGetSingleVideo,
   { rejectValue?: string }
>("dataSlice/getSingleVideo", async (params, { rejectWithValue }) => {
   try {
      const response = await axios<IGetMediaResponse>({
         method: "GET",
         url: "https://www.googleapis.com/youtube/v3/videos",
         params: {
            part: "snippet",
            key: process.env.REACT_APP_API_KEY,
            id: params.id,
         },
      });
      return response.data;
   } catch (error: any) {
      return rejectWithValue(error.message);
   }
});
