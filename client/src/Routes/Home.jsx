import HomeComponent from '../Components/homeComponent';
import { useState } from 'react';

import '../styles/Home.css';

function Home() {
  const [renderSwitch, setRenderSwitch] = useState(0);
  const id1=1
  const id2=2
  const id3=3
  const id4=4
  const id5=5

  const handleClick = () => {
    setRenderSwitch((prevCount) => {
      
      return prevCount + 1;
    });

    
  };
  const renderMessage = () => {//ensuring that we are using switch case rendering, but also ensures
    //that the div appears one underneath each other
    switch (renderSwitch) {
      case 1:
        return Array.from({ length: 1 }, (_, index) => <HomeComponent key={index}  id={id2}/>);
      case 2:
        return Array.from({ length: 2 }, (_, index) => <HomeComponent key={index} id={id3} />);
      case 3:
        return Array.from({ length: 3 }, (_, index) => <HomeComponent key={index} id={id4}/>);
      case 4:
        return Array.from({ length: 4 }, (_, index) => <HomeComponent key={index} id={id5}/>);
      default:
        return null;
    }
  };
  return (
    <div className="home-container">
      <div className="homecomponent">
        <HomeComponent id={id1}/>
      </div>
      <div>
        <div>{renderMessage()}</div>
        <button onClick={handleClick} disabled={renderSwitch===4}>Add A Post</button>
      </div>
    </div>
  );
}

export default Home;
