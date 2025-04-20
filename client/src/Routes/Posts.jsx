import { useEffect, useState } from 'react';
import styles from '../styles/Posts.module.css';

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
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <button>Delete</button>
        <button>Edit</button>
      </div>
      <div className={styles.textContainer}>

        {posts.map((text, index) => (
        
          <div className={styles.text} key={index}>
           
            <p>Posted Message: {text.text}</p>
            <p>ID: {text._id}</p>
            </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;