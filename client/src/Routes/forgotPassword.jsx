import '../styles/forgotPasswordPage.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [correctVerificationCode, setCorrectVerificationCode] = useState('');
  const [userEnteredCode, setUserEnteredCode] = useState('');
  const [warning, setWarning] = useState(false);
  const [expiredWarning, setExpiredWarning] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [validPassword, setValidPassword]=useState(false)
  const [isdisabled, setIsDisabled]=useState(false)


  const apiUrl=import.meta.env.VITE_URL

  useEffect(() => {
    const isEmailValid = email.trim() !== '';
    const isCodeValid = userEnteredCode.trim() !== '';
    const isPasswordValid = newPassword.trim() !== '';
    
    if (step === 1) {
      setIsDisabled(!isEmailValid);
    } else if (step === 2) {
      setIsDisabled(!isCodeValid);
    } else if (step === 3) {
      setIsDisabled(!isPasswordValid);
    }
  }, [email, userEnteredCode, newPassword, step]);
  
  

  useEffect(() => {
    if (step === 3) {
      setWarning(false);
      setExpiredWarning(false);
    }
  }, [step]);

  const handleSubmit = async () => {
    
    const response = await fetch(`${apiUrl}/emailService`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        email: email,
      }),
    });
    const data = await response.json();
    setCorrectVerificationCode(data.message);
  };

  const handleFinish = async () => {
    const isValidPassword =
      newPassword.length >= 10 &&
      /^[a-zA-Z0-9@\$!%*?&#^]+$/.test(newPassword) &&
      /[a-zA-Z]/.test(newPassword) &&
      /[0-9]/.test(newPassword) &&
      /[@$!%*?&#^]/.test(newPassword);
  
    if (!isValidPassword) {
      setValidPassword(true); 
      return;
    }
  
    setValidPassword(false); 
  
    const response = await fetch(`${apiUrl}/resetPassword`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        newPassword: newPassword,
      }),
    });
  
    const data = await response.json();
    if (data.data === 'Password Changed') {
      setStep(4);
    } else {
      setStep(5);
    }
  };
  
  return step == 1 ? (
    <div className="forgotPassword">
      <div className="verification">
        <p className="userUnderstanding">
          If your email is associated with an account on our platform, then the
          verification code will be sent to the entered email.
        </p>
        <p>Enter Email:</p>
        <input
          placeholder="Enter Email..."
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button disabled={isdisabled}
          onClick={() => {
            handleSubmit();
            setStep(2);
          }}
        >
          Send Verification Code
        </button>
      </div>
    </div>
  ) : step == 2 ? (
    <div className="forgotPassword">
      <div className="verification">
        {warning && (
          <div className="warning">Code entered is incorrect. Try again.</div>
        )}
        {expiredWarning && (
          <div className="warning">Code is expired. Pleae try again.</div>
        )}
        <p className="userUnderstanding">
          Verification code has been sent to the entered email. If you did not
          receive it, please wait a few minutes.
        </p>
        <p>Enter Verificaton Code:</p>
        <input
          placeholder="Enter Code..."
          value={userEnteredCode}
          onChange={(event) => setUserEnteredCode(event.target.value)}
        />
        <button
          onClick={async () => {
            if (userEnteredCode == correctVerificationCode) {
              const response = await fetch('http://localhost:3000/codeCheck', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                  email: email,
                }),
              });
              const data = await response.json();
              if (data.data == 'Expired') {
                setExpiredWarning(true);

                navigate('/forgotPassword');
              }
              if (data.data == 'Not Expire') {
                setStep(3);
              }
            } else if (userEnteredCode != correctVerificationCode) {
              setWarning(true);
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  ) : step == 3 ? (
    <div className="finalPassword">
      <div className="finalverification">
        {validPassword && <div className='passwordWarning'>Password must have 10 characters, contain both numbers and letters and also a special symbol.</div>}
        <p>Reset password:</p>
        <input
          placeholder="New Password..."
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />

        <button onClick={handleFinish}>Reset Password</button>
      </div>
    </div>
  ) : step == 4 ? (
    <div className="finalSuccess">
      <div className="finalSuccessSub">
        <p>Password changed! You can navigate back to the login page.</p>
        <Link to="/login">Login</Link>
      </div>
    </div>
  ) : step == 5 ? (
    <div className="finalSuccess">
      <div className="finalFailSub">
        <p>Password was unable to be changed. Please try again later.</p>
        <Link to="/login">Login</Link>
      </div>
    </div>
  ) : null;
}
