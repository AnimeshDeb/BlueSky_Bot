import HomeComponent from '../Components/homeComponent';
import { useState } from 'react';
import '../styles/Home.css';

function Home() {
  const [renderSwitch, setRenderSwitch] = useState(0);
  const ids = [1, 2, 3, 4, 5]; // Store IDs in an array

  const handleClick = () => {
    setRenderSwitch((prevCount) => Math.min(prevCount + 1, 4)); // Prevent exceeding 4
  };

  const renderMessage = () => {
    return ids.slice(1, renderSwitch + 1).map((id, index) => (
      <HomeComponent key={index} id={id} renderSwitch={renderSwitch} setRenderSwitch={setRenderSwitch} />
    ));
  };
  

  return (
    <div className="home-container">
      <div className="homecomponent">
        <HomeComponent id={ids[0]} renderSwitch={renderSwitch} setRenderSwitch={setRenderSwitch} />
      </div>
      <div>
        <div>{renderMessage()}</div>
        <button onClick={handleClick} disabled={renderSwitch === 4}>Add A Post</button>
      </div>
    </div>
  );
}

export default Home;
