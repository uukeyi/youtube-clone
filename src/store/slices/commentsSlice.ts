import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IComment, ICommentsResponse } from "../../interfaces/commentsResponse";
import { getComments } from "../actions/comments";
interface IInitialState {
   comments: IComment[];
   error: boolean;
   errorMessage: string;
}

const initialState: IInitialState = {
   comments: [],
   error: false,
   errorMessage: "",
};

const commentsSlice = createSlice({
   name: "commentsSlice",
   initialState: initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(
         getComments.fulfilled,
         (state, action: PayloadAction<ICommentsResponse>) => {
            state.comments = action.payload.items
            
            state.error = false
         }
      );
      builder.addCase(
         getComments.rejected,
         (state, action: PayloadAction<any>) => {
            state.error = true
            state.errorMessage = action.payload
         }
      );
   },
});


export default commentsSlice.reducer
