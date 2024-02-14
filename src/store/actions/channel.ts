import { createAsyncThunk } from "@reduxjs/toolkit";
import { IChannelResponse } from "../../interfaces/channelResponse";
import axios from "axios";

interface IGetChannel {
   id: number | string;
}
export const getChannel = createAsyncThunk<
   IChannelResponse,
   IGetChannel,
   { rejectValue?: string }
>("channelSlice", async (params, { rejectWithValue }) => {
   try {
      const response = await axios<IChannelResponse>({
         method: "GET",
         url: "https://www.googleapis.com/youtube/v3/channels",
         params: {
            part: "snippet",
            key: process.env.REACT_APP_API_KEY,
            id: params.id,
         },
      });
      return response.data;
   } catch (error : any) {

return rejectWithValue(error.message)
   }
});
