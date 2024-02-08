import { createSlice } from "@reduxjs/toolkit";
import { getData, getSearch } from "../actions/data";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IGetSearchDataReturn } from "../../interfaces/mediaResponse";
import {
   IGetMediaResponse,
   ISearchVideoSnippet,
   IVideoSnippet,
} from "../../interfaces/mediaResponse";
interface IMedia {
   media: IVideoSnippet[];
   searchMedia: ISearchVideoSnippet[];
   pageToken: string;
   errorInfo: {
      value: string;
      isError: boolean;
   };
}
const initialState: IMedia = {
   media: [],
   searchMedia: [],
   pageToken: "",
   errorInfo: {
      value: "",
      isError: false,
   },
};
const dataSlice = createSlice({
   name: "dataSlice",
   initialState: initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(
         getData.fulfilled,
         (state, action: PayloadAction<IGetMediaResponse>) => {
            state.media = [...state.media, ...action.payload.items];
            state.pageToken = action.payload.nextPageToken;
            state.errorInfo.isError = false;
         }
      );
      builder.addCase(getData.rejected, (state, action: PayloadAction<any>) => {
         state.errorInfo.value = action.payload;
         state.errorInfo.isError = true;
      });
      builder.addCase(
         getSearch.fulfilled,
         (state, action: PayloadAction<IGetSearchDataReturn>) => {
            // console.log(action.payload.newRequest)
            if (action.payload.newRequest) {
               state.searchMedia = action.payload.data.items;
               // console.log('new request')
            } else {
               state.searchMedia = [
                  ...state.searchMedia,
                  ...action.payload.data.items,
               ];
               // console.log('past request')

            }
            state.pageToken = action.payload.data.nextPageToken;

            state.errorInfo.isError = false;
         }
      );
      builder.addCase(
         getSearch.rejected,
         (state, action: PayloadAction<any>) => {
            state.errorInfo.value = action.payload;
            state.errorInfo.isError = true;
         }
      );
   },
});
export default dataSlice.reducer;
