import { useEffect, useState } from 'react';
import '../styles/Posts.css';

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch('http://localhost:3000/getPostInfo', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        const data = await response.json();
        console.log('clientside data ', data.data);
        setPosts(data.data || []); // Ensure it's an array
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }
    fetchPost();
  }, []);

  return (
    <div className="container">
      <div className='textContainer'>

        {posts.map((text, index) => (
        
          <div className='text' key={index}>
            <button className='deleteBtn'>Delete </button>
            <button className='editBtn'>Edit</button>
            {text}
            </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;