import { configureStore } from "@reduxjs/toolkit";
// Assuming postsSlice.js is in src/features/posts
import postsReducer from "../features/posts/postsSlice"; 

export default configureStore({
  reducer: {
    posts: postsReducer, // Add the new posts reducer
  },
});