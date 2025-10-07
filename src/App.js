import React from 'react';
// Removed FAKE_POSTS_DATA import as it is now in the slice
import logo from './reddit-minimal.png';
import './App.css';
// We only need useSelector now, as we removed the dispatching logic
import { useSelector } from 'react-redux';
import { selectPosts, selectPostsStatus, selectPostsError } from './features/posts/postsSlice.js';

function App() {
  // Removed useDispatch and useEffect since data is loaded synchronously via initial state
  const posts = useSelector(selectPosts);
  const status = useSelector(selectPostsStatus);
  const error = useSelector(selectPostsError);

  // Since data is instant, we skip the 'loading' check.
  // We keep the error check in case the mock data import failed for some reason.
  if (error) {
    return <div>Error: {error}</div>; 
  }

  return (
    <div className="App">
      <header className="App-header" style={{ marginBottom: '20px' }}>
        <img src={logo} className="App-logo" alt="logo" style={{ height: '40px' }} />
        <h1 style={{ fontSize: '1.5rem' }}>Simple Reddit Feed (Mock Data)</h1>
      </header>
      
      <main className="posts-list" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 15px' }}>
        {posts.length === 0 && status === 'succeeded' ? (
          <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' }}>
            No posts found.
          </div>
        ) : (
          posts.map((post) => (
            <article 
              key={post.id} 
              className="post-card" 
              style={{ 
                marginBottom: '15px', 
                padding: '15px', 
                border: '1px solid #eee', 
                borderRadius: '8px', 
                backgroundColor: '#fff', 
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}
            >
              <div className="post-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h2 style={{ fontSize: '1.2rem', margin: 0, color: '#0079D3' }}>{post.title}</h2>
                <span style={{ fontSize: '0.8rem', color: '#888' }}>{post.subreddit_name_prefixed}</span>
              </div>
              <p style={{ fontSize: '1rem', color: '#444', marginBottom: '10px' }}>
                {post.selftext.substring(0, 100)}...
              </p>
              <div className="post-footer" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#555' }}>
                <span>Author: {post.author}</span>
                <span>👍 {post.ups || 'N/A'} Upvotes</span>
                <span>💬 {post.num_comments || 'N/A'} Comments</span>
              </div>
            </article>
          ))
        )}
      </main>
    </div>
  );
}

export default App;