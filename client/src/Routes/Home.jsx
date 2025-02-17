import HomeComponent from '../Components/homeComponent';
import { useState } from 'react';
import '../styles/Home.css';

function Home() {
  const [renderSwitch, setRenderSwitch] = useState(0);
 
  

  const handleClick = () => {
    setRenderSwitch((prevCount) => Math.min(prevCount + 1, 4)); // Prevent exceeding 4
    
  };

  const renderMessage = () => {
     
  // if (renderSwitch===5){console.log("MAX LIMIT REACHED")}
      switch (renderSwitch) {
        case 4:
          console.log("MAX LIMIT REACHED")
          return
        // case 0:
        //   console.log("case 0")
        //   return  [
        //     <HomeComponent key={6} id={6} renderSwitch={renderSwitch} setRenderSwitch={setRenderSwitch} />,

        //   ];
        // case 1:
        //   console.log("case 1")
        //   return [
        //     <HomeComponent key={6} id={6} renderSwitch={renderSwitch} setRenderSwitch={setRenderSwitch} />,

        //   <HomeComponent key={2} id={2} renderSwitch={renderSwitch} setRenderSwitch={setRenderSwitch} />];
        // case 2:
        //   console.log("case 2")
        //   return [
        //     <HomeComponent key={6} id={6} renderSwitch={renderSwitch} setRenderSwitch={setRenderSwitch} />,

        //     <HomeComponent key={2} id={2} renderSwitch={renderSwitch} setRenderSwitch={setRenderSwitch} />,
        //     <HomeComponent key={3} id={3} renderSwitch={renderSwitch} setRenderSwitch={setRenderSwitch} />,
        //   ];
        // case 3:
        //   console.log("case 3")
        //   return [
        //     <HomeComponent key={6} id={6} renderSwitch={renderSwitch} setRenderSwitch={setRenderSwitch} />,

        //     <HomeComponent key={2} id={2} renderSwitch={renderSwitch} setRenderSwitch={setRenderSwitch} />,
        //     <HomeComponent key={3} id={3} renderSwitch={renderSwitch} setRenderSwitch={setRenderSwitch} />,
        //     <HomeComponent key={4} id={4} renderSwitch={renderSwitch} setRenderSwitch={setRenderSwitch} />,
        //   ];
        // case 4:
        //   console.log("case 4")
        //   return [
        //     <HomeComponent key={6} id={6} renderSwitch={renderSwitch} setRenderSwitch={setRenderSwitch} />,

        //     <HomeComponent key={2} id={2} renderSwitch={renderSwitch} setRenderSwitch={setRenderSwitch} />,
        //     <HomeComponent key={3} id={3} renderSwitch={renderSwitch} setRenderSwitch={setRenderSwitch} />,
        //     <HomeComponent key={4} id={4} renderSwitch={renderSwitch} setRenderSwitch={setRenderSwitch} />,
        //     <HomeComponent key={5} id={5} renderSwitch={renderSwitch} setRenderSwitch={setRenderSwitch} />,
        //   ];
        default:
         return null;
      
    };
    

    // return ids.slice(1, renderSwitch + 1).map((id, index) => (
    //   <HomeComponent key={index} id={id} renderSwitch={renderSwitch} setRenderSwitch={setRenderSwitch} />
    // ));
  };

  return (
    <div className="home-container">
      <div className="homecomponent">
        <HomeComponent
          renderSwitch={renderSwitch}
          setRenderSwitch={setRenderSwitch}
        />
      </div>
      <div>
        <div>{renderMessage()}</div>
        <button onClick={handleClick} disabled={renderSwitch === 4}>
          Add A Post
        </button>
      </div>
    </div>
  );
}

export default Home;
