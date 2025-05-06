import { useState } from 'react';
import PasswordMatch from '../Components/passwordmatch';
import PasswordRequirements from '../Components/passwordRequirements';
import EmailExists from '../Components/emailAlreadyExists';
import { useNavigate } from 'react-router-dom';
import '../styles/signup.css';
import { Link } from 'react-router-dom';
import successImg from '../images/success.jpg';
function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [passRequirementsVisible, setPassRequirmentsVisible] = useState(false);
  const [emailValidVisible, setEmailValidVisible] = useState(false);
  // const [isLogged, setIsLogged]=useState(false)
  let passwordValid = true;
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (password != confirmPassword) {
        setVisible(true);
      } else {
        setVisible(false);
      }
      if (
        password.length < 10 ||
        /[a-zA-Z0-9]/.test(password) === false ||
        /[@$!%*?&#^]/.test(password) === false
      ) {
        setPassRequirmentsVisible(true);
        passwordValid = false;
      }
      if (
        password.length >= 10 &&
        /^[a-zA-Z0-9]+$/.test(password) === true &&
        /[@$!%*?&#^]/.test(password) === true
      ) {
        passwordValid = true;
        setPassRequirmentsVisible(false);
      }

      if (password === confirmPassword && passwordValid === true) {
        setVisible(false);
        setPassRequirmentsVisible(false);
        const response = await fetch('http://localhost:3000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email, password: password }),
        });
        const data = await response.json();
        if (data.data === 'NULL') {
          setEmailValidVisible(true);
        } else if (data.data === 'OK') {
          setEmailValidVisible(false);
          // setIsLogged(true)
          navigate('/home', { state: { isLogged: true } });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="login-left-image">
        <div className="login-left">
         <span> Plan, schedule, grow. </span> <span>On Your Terms.</span>
        </div>
        <img src={successImg} alt="Success Image" className="successImg" />
      </div>
      <div className="login-right-container">
        <div className="login-right">
          <div className="login-header">
            <h1>Signup</h1>
            <p>
              Have an account? <Link to="/login">Login</Link>{' '}
            </p>
          </div>
          <div className="email-password">
            Email:
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
            Password:
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            Confirm Password:
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <button className='signupBtn' onClick={handleSubmit}>Signup</button>
          </div>
        </div>
        {passRequirementsVisible && <PasswordRequirements />}
        {visible && <PasswordMatch />}
        {emailValidVisible && <EmailExists />}
      </div>
    </div>
  );
}
export default Signup;
