import { createSlice } from "@reduxjs/toolkit";
import { getData, getSearch, getSingleVideo } from "../actions/data";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
   IGetMediaResponse,
   IGetMediaReturn,
   IGetSearchDataReturn,
} from "../../interfaces/mediaResponse";
import {
   ISearchVideoSnippet,
   IVideoSnippet,
} from "../../interfaces/mediaResponse";
interface IMedia {
   media: IVideoSnippet[];
   searchMedia: ISearchVideoSnippet[];
   singleVideo: IVideoSnippet[];

   errorInfo: {
      value: string;
      isError: boolean;
   };
}
const initialState: IMedia = {
   media: [],
   searchMedia: [],
   singleVideo: [],
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
         (state, action: PayloadAction<IGetMediaReturn>) => {
            if (action.payload.newRequest) {
               state.media = action.payload.media.items;
            } else {
               state.media = [...state.media, ...action.payload.media.items];
            }
            // console.log(action.payload.media.nextPageToken)

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
            if (action.payload.newRequest) {
               state.searchMedia = action.payload.data.items;
            } else {
               state.searchMedia = [
                  ...state.searchMedia,
                  ...action.payload.data.items,
               ];
            }
       

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
      builder.addCase(
         getSingleVideo.fulfilled,
         (state, action: PayloadAction<IGetMediaResponse>) => {
            state.singleVideo = action.payload.items;
            state.errorInfo.isError = false;
         }
      );
      builder.addCase(
         getSingleVideo.rejected,
         (state, action: PayloadAction<any>) => {
            state.errorInfo.value = action.payload;
            state.errorInfo.isError = true;
         }
      );
   },
});
export default dataSlice.reducer;
