import { useState, useEffect } from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import moment from 'moment';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import homeStyles from '../styles/createpost.module.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import logout from '../images/logout.png';
import save from '../images/bookmark.png';
import saveicon from '../images/saveicon.png'
import FooterHome from '../Components/footerHome';

function HomeComponent() {
  const [text, setText] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [calDate, setCalDate] = useState(moment());
  const [clockTime, setClockTime] = useState(moment());
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
  };
  const handleChangeClock = (newValue) => {
    setClockTime(newValue);
  };

  const handleSubmit = async () => {
    setLoading(true);

    
    const formmattedTime = clockTime.format('h:mm A');
    const formattedDate = calDate.format('MM-DD-YYYY');

    const response = await fetch('http://localhost:3000/makePost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        text: text,
        username: username,
        password: password,
        calendar: formattedDate,
        time: formmattedTime,
      }),
      credentials: 'include',
    });
    const data = await response.json();
    setLoading(false);
    if (data.data == 'Success') {
      window.location.reload();
    }
  };
  const handleLogout = async () => {
    const response = await fetch('http://localhost:3000/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = await response.json();
    if (data.message == 'logout success') {
      navigate('/login');
    }
  };

  return (
    <div>
      {loading ? (
        <div className={homeStyles.loadingParent}>
          <div className={homeStyles.loading}>Loading</div>
        </div>
      ) : (
        <div className={homeStyles.postHeader}>
          <div className={homeStyles.navigationParent}>
            <div className={homeStyles.navigationPosts}>
              <button onClick={() => navigate('/posts')}>
                <img src={save} alt="Post Icon" />
                Posts
              </button>
            </div>
            <div className={homeStyles.navigationLogout}>
              <button onClick={handleLogout}>
                <img src={logout} alt="Logout Icon" />
                Logout
              </button>
            </div>
          </div>
          <div className={homeStyles.container}>
            <div className={homeStyles.information}>
              <div className={homeStyles.information_sub}>
                <div className={homeStyles.bluesky_header}>
                  Bluesky Credentials:
                </div>
                <div className={homeStyles.username_password}>
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
              </div>
              <div className={homeStyles.text}>
                <textarea
                  type="text"
                  placeholder="Type your post..."
                  className="text_input"
                  value={text}
                  onChange={handleChangeText}
                />
              </div>
            </div>
            <div className={homeStyles.time}>
              <div className={homeStyles.calander}>
                <DateCalendar
                  value={calDate}
                  onChange={handleChangeCal}
                  views={['year', 'month', 'day']}
                  shouldDisableDate={(date) => date.isBefore(moment(), 'day')}
                />
              </div>
              <div className={homeStyles.clock_btn}>
                <div className={homeStyles.clock}>
                  <TimePicker
                    value={clockTime}
                    onChange={handleChangeClock}
                    label="Choose a time"
                  />
                </div>

                <button
                  className={homeStyles.submitButton}
                  onClick={handleSubmit}
                >
                  Schedule Post
                </button>
              </div>
            </div>
          </div>

          <div className={homeStyles.imgLink}>
            <p>Posts and Logout Icon attribution links: </p>
            <a
              href="https://www.flaticon.com/free-icon/save-instagram_5662990?term=save&page=1&position=3&origin=tag&related_id=5662990"
              target="_blank"
              title="save icons"
            >
              Save icons created by Freepik - Flaticon
            </a>

            <a
              href="https://www.flaticon.com/free-icons/logout"
              target="_blank"
              title="logout icons"
            >
              Logout icons created by deemakdaksina - Flaticon
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

HomeComponent.propTypes = {
  setRenderSwitch: PropTypes.func.isRequired,
};
export default HomeComponent;
