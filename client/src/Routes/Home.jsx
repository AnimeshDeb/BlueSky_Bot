import HomeComponent from '../Components/homeComponent';
import { useState } from 'react';
import '../styles/Home.css';

function Home() {
  const [renderSwitch, setRenderSwitch] = useState(0);
  
  const handleClick = () => {
    setRenderSwitch((prevCount) => {
      
      return prevCount + 1;
    });
  };
  const renderMessage = () => {//ensuring that we are using switch case rendering, but also ensures
    //that the div appears one underneath each other
    switch (renderSwitch) {
      case 1:
        return Array.from({ length: 1 }, (_, index) => <HomeComponent key={index} />);
      case 2:
        return Array.from({ length: 2 }, (_, index) => <HomeComponent key={index} />);
      case 3:
        return Array.from({ length: 3 }, (_, index) => <HomeComponent key={index} />);
      case 4:
        return Array.from({ length: 4 }, (_, index) => <HomeComponent key={index} />);
      default:
        return null;
    }
  };
  return (
    <div className="home-container">
      <div className="homecomponent">
        <HomeComponent />
      </div>
      <div>
        <div>{renderMessage()}</div>
        <button onClick={handleClick} disabled={renderSwitch===4}>+</button>
      </div>
    </div>
  );
}

export default Home;
