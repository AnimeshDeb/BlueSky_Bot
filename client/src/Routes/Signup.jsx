import { useState } from 'react';
import PasswordMatch from '../Components/passwordmatch';
import PasswordRequirements from '../Components/passwordRequirements';
import EmailExists from '../Components/emailAlreadyExists';
import { useNavigate } from 'react-router-dom';
function Signup() {
  const navigate=useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [passRequirementsVisible, setPassRequirmentsVisible ]=useState(false)
  const [emailValidVisible, setEmailValidVisible]=useState(false)
  // const [isLogged, setIsLogged]=useState(false)
  let passwordValid=true
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async() => {
    try{
      if (password != confirmPassword ) {
        setVisible(true);
      } else{
        setVisible(false)
      }
      if(password.length<10 || /[a-zA-Z0-9]/.test(password)===false || /[@$!%*?&#^]/.test(password)===false)
  
      {
        setPassRequirmentsVisible(true)
        passwordValid=false
      }
      if(password.length>=10 && /^[a-zA-Z0-9]+$/.test(password)===true && /[@$!%*?&#^]/.test(password)===true)
      {
        passwordValid=true
        setPassRequirmentsVisible(false)
      }
      
  
       if (password === confirmPassword && passwordValid===true) {
        setVisible(false);
        setPassRequirmentsVisible(false)
        const response=await fetch('http://localhost:3000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email, password: password }),
        })
          const data=await response.json()
          if(data.data==="NULL")
          {
            setEmailValidVisible(true)
          }else if (data.data==="OK")
            {
              setEmailValidVisible(false)
              // setIsLogged(true)
              navigate('/home', {state: {isLogged: true} })

            }
        
          
      }
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <button onClick={handleSubmit}>Signup</button>
        {passRequirementsVisible &&<PasswordRequirements/>}
        {visible && <PasswordMatch />}
        {emailValidVisible && <EmailExists/>}
      </div>
    </div>
  );
}
export default Signup;
