import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IComment, ICommentsResponse } from "../../interfaces/commentsResponse";
import { addComment, getComments } from "../actions/comments";
import { IGetCommentsReturn } from "../../interfaces/commentsResponse";
interface IInitialState {
   comments: IComment[];
   error: boolean;
   errorMessage: string;
   pageToken: string;
}

const initialState: IInitialState = {
   comments: [],
   error: false,
   errorMessage: "",
   pageToken: "",
};

const commentsSlice = createSlice({
   name: "commentsSlice",
   initialState: initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(
         getComments.fulfilled,
         (state, action: PayloadAction<IGetCommentsReturn>) => {
            if (action.payload.newRequest) {
               state.comments = action.payload.comments.items;
            } else {
               state.comments = [
                  ...state.comments,
                  ...action.payload.comments.items,
               ];
            }
            state.pageToken = action.payload.comments.nextPageToken;
            state.error = false;
         }
      );
      builder.addCase(
         getComments.rejected,
         (state, action: PayloadAction<any>) => {
            state.error = true;
            state.errorMessage = action.payload;
         }
      );
      builder.addCase(
         addComment.fulfilled,
         (state, action: PayloadAction<any>) => {
            state.comments = [action.payload , ...state.comments];
            state.error = false;
         }
      );
      builder.addCase(
         addComment.rejected,
         (state, action: PayloadAction<any>) => {
            state.error = true;
            state.errorMessage = action.payload;
         }
      );
   },
});

export default commentsSlice.reducer;
