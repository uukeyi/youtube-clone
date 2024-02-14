import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./slices/dataSlice";
import channelSlice from "./slices/channelSlice";
import commentsSlice from "./slices/commentsSlice";

export const store = configureStore({
    reducer : {
        data : dataSlice,
        channelData : channelSlice,
        comments : commentsSlice
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;