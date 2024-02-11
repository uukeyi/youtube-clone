import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IChannel, IChannelResponse } from "../../interfaces/channelResponse";
import { getChannel } from "../actions/channel";

interface IInitialState {
   channel: IChannel[];
   error: boolean;
   errorMessage: string;
}
const initialState: IInitialState = {
   channel: [],
   error: false,
   errorMessage: "",
};
const channelSlice = createSlice({
   name: "channelSlice",
   initialState: initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(
         getChannel.fulfilled,
         (state, action: PayloadAction<IChannelResponse>) => {
            state.channel = action.payload.items;
            state.error = false;
         }
      );
      builder.addCase(
         getChannel.rejected,
         (state, action: PayloadAction<any>) => {
            state.errorMessage = action.payload;
            state.error = false;
         }
      );
   },
});
export default channelSlice.reducer;