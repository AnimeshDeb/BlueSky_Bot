import { useEffect, useState } from 'react';
import styles from '../styles/posts.module.css';
function Posts() {
  const [posts, setPosts] = useState([]);
  const [isDeleteVisible, setisDeleteVisible] = useState(false);
  const [isEditVisible, setisEditVisible] = useState(false);
  const [isFinishEditVisible, setisFinishEditVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputMessageID, setInputMessageID] = useState(null);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch('http://localhost:3000/getPostInfo', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        const data = await response.json();
        if(data.data=='Empty'){
          return;
        }
        setPosts(data.data || []); 
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }
    fetchPost();
  }, [reload]);

  const handleDelete = async () => {
    const response = await fetch('http://localhost:3000/deletePost', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messageID: inputValue }),
      credentials: 'include',
    });
    const data = await response.json();
    if (data.data == true) {
      console.log('Success Deletion');
    } else if (data.data == false) {
      alert('Post unable to be deleted. Please try again later.');
    } //in case of errors or same message id
    //being repeatedly entered

    setisDeleteVisible(false); // close the popup
    setInputValue(''); // clear input
    setReload((prev) => !prev); //reloads components to trigger useEffect
  };

  const handleEdit = async () => {
    //  setInputValue(''); // clear input
    // setInputMessageID(' ')
    setisEditVisible(false);
    setisFinishEditVisible(true);
    console.log('userID: ', inputMessageID);
    const response = await fetch(
      `http://localhost:3000/getPostInfo?userID=${inputMessageID}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    );

    const data = await response.json();
    // console.log("data.textfield: ", data.data)
    setInputValue(data.data);

    setisEditVisible(false); // close the popup

    // setReload((prev) => !prev); //reloads components to trigger useEffect
  };
  const handleFinishEdit = async () => {
    const response = await fetch('http://localhost:3000/editPost', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userID: inputMessageID, userText: inputValue }),
      credentials: 'include',
    });
    const data = await response.json();
    setisFinishEditVisible(false);

    setReload((prev) => !prev);
    setInputMessageID(null);
    console.log('edit data ', data.data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <div className={styles.btnContainer}>
          <button
            className={styles.btnn}
            onClick={() => setisDeleteVisible(true)}
          >
            Delete
          </button>
          <button
            className={styles.btnn}
            onClick={() => setisEditVisible(true)}
          >
            Edit
          </button>
        </div>
        {/* edit  */}
        <div className={styles.deleteVisible}>
          {isEditVisible && (
            <div className={styles.popupOverlay}>
              <div className={styles.popup}>
                {/* Move close button to the top of the popup */}
                <div className={styles.closeButton}>
                  <div>
                    <button
                      className={styles.closeButton}
                      onClick={() => setisEditVisible(false)}
                    >
                      x
                    </button>
                  </div>
                </div>

                <input
                  className={styles.postsInput}
                  type="text"
                  placeholder="Enter message ID..."
                  value={inputMessageID}
                  onChange={(e) => setInputMessageID(e.target.value)}
                />
                <button className={styles.delEdit} onClick={handleEdit}>
                  Edit
                </button>
              </div>
            </div>
          )}
          {isFinishEditVisible && (
            <div className={styles.popupOverlay}>
              <div className={styles.popup}>
                {/* Move close button to the top of the popup */}
                <div className={styles.closeButton}>
                  <div>
                    <button
                      className={styles.closeButton}
                      onClick={() => setisFinishEditVisible(false)}
                    >
                      x
                    </button>
                  </div>
                </div>
                <div className={styles.nextEditDel}>
                  <div className={styles.inputHeader}>
                    <p>Edit Post:</p>
                    <input
                      type="text"
                      placeholder="Edit Post..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                  </div>
                  <button onClick={handleFinishEdit}>Finish Editing</button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={styles.deleteVisible}>
          {isDeleteVisible && (
            <div className={styles.popupOverlay}>
              <div className={styles.popup}>
                {/* Move close button to the top of the popup */}
                <div className={styles.closeButton}>
                  <div>
                    <button
                      className={styles.closeButton}
                      onClick={() => setisDeleteVisible(false)}
                    >
                      x
                    </button>
                  </div>
                </div>
                <div className={styles.nextEditDel}>
                  <input
                    type="text"
                    placeholder="Enter message ID..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <button className={styles.delEdit} onClick={handleDelete}>
                    Delete
                  </button>
                </div>
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
