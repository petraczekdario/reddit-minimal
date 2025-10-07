// src/features/posts/postsSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { FAKE_POSTS_DATA } from "../../components/fakeData"; // Import the mock data

// 1. Define the initial state structure using the mock data
const initialState = {
  // Load the FAKE_POSTS_DATA directly into the posts array
  posts: FAKE_POSTS_DATA,
  status: 'succeeded', // The data is instantly available
  error: null,
};

// 2. Create the slice
export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  // Since we are not fetching, we don't need thunks or extraReducers for now.
  reducers: {
    // We can add reducers here later for sorting, filtering, etc.
  },
});

// Selector function to easily retrieve posts
export const selectPosts = (state) => state.posts.posts;
export const selectPostsStatus = (state) => state.posts.status;
export const selectPostsError = (state) => state.posts.error;

export default postsSlice.reducer;