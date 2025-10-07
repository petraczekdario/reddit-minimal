import React, { useEffect } from 'react'; // Make sure useEffect is imported
import { useDispatch, useSelector } from 'react-redux';
import { loadPosts, selectPosts, selectPostsStatus, selectPostsError } from './features/posts/postsSlice.js';
import logo from './reddit-minimal.png';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const status = useSelector(selectPostsStatus);
  const error = useSelector(selectPostsError);

  // Load the posts when the component mounts
  useEffect(() => {
    dispatch(loadPosts('all')); // You can specify a subreddit here, e.g., 'all'
  }, [dispatch]);
  
  // Render logic based on status and error
  if (status === 'loading') {
    return (
      <div className="App" style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Loading posts...</h2>
      </div>
    );
  }

  if (error) {
    // Show the error message, which may include the rate limit warning
    return (
      <div className="App" style={{ textAlign: 'center', padding: '50px' }}>
        <h2 style={{ color: 'red' }}>Error: {error}</h2>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header" style={{ marginBottom: '20px' }}>
        <img src={logo} className="App-logo" alt="logo" style={{ height: '40px' }} />
        <h1 style={{ fontSize: '1.5rem' }}>Simple Reddit Feed</h1>
      </header>
      
      <div className='App-body' style={{ display: 'flex', justifyContent: 'center' }}>
        <div className='reddit-post-container' style={{ width: '90%', maxWidth: '700px' }}>
          
          {/*
            This is the key section: Map the 'posts' array received from Redux
            The structure of the data comes from the Reddit API (which you process in your thunk)
          */}
          {posts.map((post) => (
            <div 
              key={post.id} 
              className='reddit-post' 
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '15px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
            >
              <h2 
                style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: 'bold', 
                  color: '#0079D3', 
                  marginBottom: '5px' 
                }}
              >
                {post.title}
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#555' }}>
                Posted by **{post.author}** in **r/{post.subreddit}**
              </p>
              <p style={{ marginTop: '10px' }}>
                Upvotes: **{post.ups}** | Comments: **{post.num_comments}**
              </p>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default App;
