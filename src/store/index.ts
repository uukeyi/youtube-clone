import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./slices/dataSlice";
import channelSlice from "./slices/channelSlice";


export const store = configureStore({
    reducer : {
        data : dataSlice,
        channelData : channelSlice
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;