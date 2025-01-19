import React, { useState } from 'react';
import PasswordMatch from '../Components/passwordmatch';
import axios from 'axios';
function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [visible, setVisible] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = () => {
    if (password != confirmPassword) {
      setVisible(true);
    }
    if (password === confirmPassword) {
      setVisible(false);
      axios
        .post('http://localhost:3000/signup', {
          email: email,
          password: password,
        })
        .then((response) => {
          console.log('Response data:', response.data);
          // You can now log the individual properties if needed:
          console.log('Email:', response.data.email);
          console.log('Password:', response.data.password);
        })
        .catch((error) => {
          console.log('ERROR: ', error);
        });
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
        {visible && <PasswordMatch />}
      </div>
    </div>
  );
}
export default Signup;
