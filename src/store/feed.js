import { createSlice } from "@reduxjs/toolkit";

const initialFeedState = {
  isLike: false, likeCount: 0
};

const feedSlice = createSlice({
  name: "feed",
  initialState: initialFeedState,
  reducers: {
    initIsLike(state, action) {
      state.isLike = action.payload;
    },
    initLikeCount(state, action) {
      state.isLike = action.payload;
    },
    clickLike(state) {
      state.isLike = true;
      state.likeCount = state.likeCount + 1
    },
    clickUnlike(state) {
      state.isLike = false;
      state.likeCount = state.likeCount - 1
    },
  },
});

export const feedActions = feedSlice.actions;

export default feedSlice.reducer;
