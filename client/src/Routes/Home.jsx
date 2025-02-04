import { useState } from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import moment from 'moment';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import '../styles/home.css';

function Home() {
  const [text, setText] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [calDate, setCalDate] = useState(moment());

  const handleChangeText = (event) => {
    setText(event.target.value);
  };

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleChangeCal = (newValue) => {
    setCalDate(newValue);
    console.log('date', newValue);
    console.log('_d', calDate._d);
  };

  const handleSubmit = async () => {
    console.log(text);

    const response = await fetch('http://localhost:3000/makePost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        text: text,
        username: username,
        password: password,
      }),
    });
    const data = await response.json();
    console.log('data ', data);
  };

  return (
    <div className="container">
      <div className="information">
        <div className="information_sub">
          <div className="bluesky_header">Bluesky Credentials:</div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleChangeUsername}
          />
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={handleChangePassword}
          />
        </div>
        <div className="text">
          <textarea
            type="text"
            placeholder="Text"
            className="text_input"
            value={text}
            onChange={handleChangeText}
          ></textarea>
        </div>
      </div>
      <div className="time">
        <div className="calander">
          <DateCalendar
            value={calDate}
            onChange={handleChangeCal}
            views={['year', 'month', 'day']}
          />
        </div>
        <div className="clock">
          <TimePicker label="Choose a time" />
        </div>
        <button onClick={handleSubmit}> Submit</button>
      </div>
    </div>
  );
}
export default Home;
