import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PasswordIncorrect from '../Components/passwordIncorrect';
import loginStyles from '../styles/login.module.css';
import loginImg from '../images/login.jpg';
// import Cookies from 'js-cookie'
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordIncorrect, setPasswordIncorrect] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
        credentials: 'include', //ensures cookies are sent with requests
      });

      const responseConfirm = await fetch(
        'http://localhost:3000/confirmToken',
        {
          credentials: 'include',
        }
      );
      const dataConfirm = await responseConfirm.json();
      if (dataConfirm.authenticated) {
        setPasswordIncorrect(false);
        navigate('/home');
      } else setPasswordIncorrect(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={loginStyles.container_footer}>
      <div className={loginStyles.imgLink}>
        <div>
          <a
            href="https://www.freepik.com/free-vector/time-management-concept-illustration_358253409.htm#fromView=search&page=1&position=19&uuid=30144b43-ebe1-4fc0-9bf5-b0f914957b1f&query=productivity+cartoon"
            target="_blank"
          >
            Login page image attribution link
          </a>
        </div>
      </div>
      <div className={loginStyles.container}>
        <div className={loginStyles.login_left}>
          <div className={loginStyles.loginTitle}>
            <h1>Never Miss a Post Again.</h1>
            <p>
              Plan, schedule, and boost your presence on Bluesky automatically.
            </p>
          </div>
          <div className={loginStyles.loginImg}>
            {/* <div className="imgLink">
              <p>Hello</p>
            </div> */}

            <img
              src={loginImg}
              alt="Login Image"
              className={loginStyles.loginImage}
            />
          </div>

          {/* 
        <div className={loginStyles.image}>
          <img
            src={loginImg}
            alt="Login Image"
            className={loginStyles.loginImage}
          />
        </div> */}
        </div>
        <div className={loginStyles.login_right_container}>
          <div className={loginStyles.login_right}>
            <div className={loginStyles.login_header}>
              <h1>Login</h1>
              <p>
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </p>
            </div>
            <div className={loginStyles.email_password}>
              <label htmlFor="emailLabel">Email:</label>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
              
                
                <label htmlFor="passwordLabel">Password:</label>
                
            
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            {passwordIncorrect && <PasswordIncorrect />}

            <button onClick={handleSubmit}>Login</button>
            <div className={loginStyles.forgotPassword}>
            <Link to="/forgotPassword">Forgot Password?</Link>
            </div>
          </div>
        </div>
      </div>
      {/* <FooterLogin/> */}
    </div>
  );
}
export default Login;
