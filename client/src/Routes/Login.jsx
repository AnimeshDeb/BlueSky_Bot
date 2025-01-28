import '../styles/login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordIncorrect from '../Components/passwordIncorrect';
import Cookies from 'js-cookie'
function Login()  {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const[passwordIncorrect, setPasswordIncorrect]=useState(false)
  const navigate=useNavigate()
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  

  const handleSubmit = async() => {
    try{
  
      const response=await fetch('http://localhost:3000/login',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',

        },
        body:JSON.stringify({email:email, password:password}),
        credentials:'include',//ensures cookies are sent with requests
      })
      const data=await response.json()
      console.log("general data is ", data)
      console.log(Cookies.get('AuthToken'))
      if (data.data===true)
      {
        setPasswordIncorrect(false)
        navigate('/home')
        
      }
      else setPasswordIncorrect(true)

    }
    catch(error){
      console.error(error)
    }
    
  };

  return (
    <div className="container">
      <div className="login-left">PLACEHOLDER</div>
      <div className="login-right">
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordIncorrect && <PasswordIncorrect/>}
        
        <button onClick={handleSubmit}>Login</button>
    
      </div>
    </div>
  );
}
export default Login;
