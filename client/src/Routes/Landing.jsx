import {useNavigate} from 'react-router-dom'
import '../styles/landing.css'
function Landing() {
const navigate=useNavigate();
  const navigateLogin=()=>{
    navigate('/login')
  }
  const navigateSignup=()=>{
    navigate('/signup')
  }
  return (
    <div className='container'>
        <div className='home-left'>
PLACE HOLDER TEXT LANDING
        </div>
      <div className='home'>
        <button className='btn' onClick={navigateLogin} >Login</button>
        <button className='btn' onClick={navigateSignup}>Signup</button>
      </div>
      {/* <div className='home-right'>
PLACEHOLDER TEXT
      </div> */}
    </div>
  );
}

export default Landing;
