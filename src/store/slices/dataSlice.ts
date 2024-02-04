import { createSlice } from "@reduxjs/toolkit";
import { getData } from "../actions/data";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IGetMediaResponse, IVideoSnippet } from "../../interfaces/mediaResponse";
interface IMedia {
    media : IVideoSnippet[]
}
const initialState : IMedia = {
    media : []
}
const dataSlice = createSlice({
   name: "dataSlice",
   initialState:initialState,
   reducers : {},
   extraReducers: (builder) => {
      builder.addCase(getData.fulfilled, (state, action : PayloadAction<IGetMediaResponse>) => {
         state.media = action.payload.items;
      });
   },
});
export default dataSlice.reducer;
