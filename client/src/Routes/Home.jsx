import '../styles/home.css';
import {useNavigate} from 'react-router-dom'
function SignIn() {
const navigate=useNavigate();
  const navigatePage=()=>{
    navigate('/login')
  }
  return (
    <div className='contain7er'>
        <div className='home-left'>
PLACE HOLDER TEXT
        </div>
      <div className='home'>
        <button className='btn' onClick={navigatePage} >Login</button>
        <button className='btn'>Signup</button>
      </div>
      {/* <div className='home-right'>
PLACEHOLDER TEXT
      </div> */}
    </div>
  );
}

export default SignIn;
