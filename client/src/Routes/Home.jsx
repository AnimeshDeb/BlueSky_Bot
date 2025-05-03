import HomeComponent from '../Components/homeComponent';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/userhome.module.css'
function Home() {
  const navigate=useNavigate();
  const [renderSwitch, setRenderSwitch] = useState(0);

  const handleLogout=async ()=>{
    const response= await fetch("http://localhost:3000/logout",{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
      },
      credentials:'include',
    })
    const data=await response.json()
    if (data.message=='logout success'){
      navigate('/login')
    }
  }

 

  return (
    <div className='superContainer'>
      <div className="header">
        <button onClick={()=>navigate('/posts')}>Posts</button>
        <button onClick={handleLogout} >Logout</button>
     
      </div>
      <div className="home-container">
        <div className="homecomponent">
          <HomeComponent
            renderSwitch={renderSwitch}
            setRenderSwitch={setRenderSwitch}
          />
        </div>
        <div>
          
        </div>
      </div>
    </div>
  );
}

export default Home;
