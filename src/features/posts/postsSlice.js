import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 1. Define the asynchronous thunk function
export const loadPosts = createAsyncThunk(
  // Action type string (e.g., 'posts/load')
  'posts/loadPosts', 
  async (subreddit = 'all', thunkAPI) => {
    // Basic API URL to fetch a subreddit's JSON feed
    const url = `/r/${subreddit}/top.json`;
    
    try {
      const response = await fetch(url);
      
      // Check for HTTP errors (like 404 or rate limits 429)
      if (!response.ok) {
        // If the status is 4xx or 5xx, reject the thunk with the status
        return thunkAPI.rejectWithValue(response.status);
      }
      
      const json = await response.json();
      
      // The API response is often nested, extract the array of posts
      return json.data.children.map(child => child.data);

    } catch (error) {
      // Handle network errors (e.g., connection issues)
      return thunkAPI.rejectWithValue('Network Error');
    }
  }
);

// 2. Define the initial state structure
const initialState = {
  posts: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  // *** RATE LIMIT MITIGATION: Cache for temporary display ***
  cachedPosts: [], 
};

// 3. Create the slice
export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // We don't need local reducers, all changes come from the thunk
  },
  
  // 4. Handle the thunk's lifecycle actions here (extraReducers)
  extraReducers: (builder) => {
    builder
      // --- Pending (Loading) ---
      .addCase(loadPosts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      // --- Fulfilled (Success) ---
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null; // Clear previous errors
        state.posts = action.payload; // Update the posts
        state.cachedPosts = action.payload; // Update the cache
      })
      // --- Rejected (Error/Rate Limit) ---
      .addCase(loadPosts.rejected, (state, action) => {
        state.status = 'failed';
        
        // Strategy 1: Handle rate limit and use cache (The Hint you provided)
        if (action.payload === 429) { 
          state.error = 'API Rate Limit Exceeded. Displaying cached data.';
          // Display the cached data instead of showing an empty error screen
          state.posts = state.cachedPosts;
        } else if (action.payload) {
          // Handle other specific API errors (like 404)
          state.error = `API Error: ${action.payload}`;
        } else {
          // General error handling
          state.error = 'Failed to fetch posts.';
        }
      });
  },
});

// Selector function to easily retrieve posts
export const selectPosts = (state) => state.posts.posts;
export const selectPostsStatus = (state) => state.posts.status;
export const selectPostsError = (state) => state.posts.error;

export default postsSlice.reducer;