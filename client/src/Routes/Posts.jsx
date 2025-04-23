import { useEffect, useState } from 'react';
import styles from '../styles/Posts.module.css';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [isDeleteVisible, setisDeleteVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [reload, setReload]=useState(false)
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
  }, [reload]);
  
  const handleSubmit = async () => {
    console.log('Submitted value:', inputValue);
    const response=await fetch('http://localhost:3000/deletePost',{
      method: 'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({ messageID: inputValue}),
      credentials:'include',
    })
    const data=await response.json()
    if (data.data==true)
    {
      console.log("Success Deletion")
    }
    else if (data.data==false){alert("Post unable to be deleted. Please try again later.")}//in case of errors or same message id 
    //being repeatedly entered
  

    

    setisDeleteVisible(false); // close the popup
    setInputValue(''); // clear input
    setReload(prev=>!prev)
  };


  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <div className={styles.btnContainer}>
          <button onClick={() => setisDeleteVisible(true)}>Delete</button>
          <button>Edit</button>
        </div>
        <div className={styles.deleteVisible}>
        {isDeleteVisible && (
  <div className={styles.popupOverlay}>
    <div className={styles.popup}>
      {/* Move close button to the top of the popup */}
      <div className={styles.closeButton}> 
        <div>
        <button className={styles.closeButton} onClick={() => setisDeleteVisible(false)}>x</button>
        </div>
      </div>
      
      <input 
        type="text" 
        placeholder="Enter message ID..." 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  </div>
)}
        </div>
      </div>

      <div className={styles.textContainer}>
        {posts.map((text, index) => (
          <div className={styles.text} key={index}>
            <p>Posted Message: {text.text}</p>
            <p>Message ID: {text._id}</p>
            <p>Date Posted: {text.calendar}</p>
            <p>Time Posted: {text.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;
