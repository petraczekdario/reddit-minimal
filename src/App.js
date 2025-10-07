import React from 'react';
import logo from './reddit-minimal.png';
import './App.css';
import { useSelector } from 'react-redux';
import { selectPosts } from './features/posts/postsSlice.js';

function App() {
  // Select only the posts array.
  const posts = useSelector(selectPosts);

  // We are bypassing all error/status checks to force a render.

  return (
    <div className="App">
      <header className="App-header" style={{ marginBottom: '20px' }}>
        <img src={logo} className="App-logo" alt="logo" style={{ height: '40px' }} />
        <h1 style={{ fontSize: '1.5rem' }}>Simple Reddit Feed (Minimal Render)</h1>
      </header>
      
      <main className="posts-list" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 15px' }}>
        {/* If the posts array is completely empty, we display a debugging message. */}
        {posts.length === 0 ? (
          <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' }}>
            Posts array is empty. Please verify **src/components/fakeData.js** is correct.
          </div>
        ) : (
          // Map and render the posts if the array is populated.
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
                {post.content ? post.content.substring(0, 100) : 'No content'}...
              </p>
              <div className="post-footer" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#555' }}>
                <span>Author: {post.author}</span>
                <span>👍 {post.upvotes || 'N/A'} Upvotes</span>
                {/* SAFE RENDER: We check the length of the comments array */}
                <span>💬 {post.comments ? post.comments.length : 0} Comments</span> 
              </div>
            </article>
          ))
        )}
      </main>
    </div>
  );
}

export default App;