import { useState, useEffect } from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import moment from 'moment';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import '../componentStyles/home.css';
import PropTypes from 'prop-types';

function HomeComponent() {
  
  const [text, setText] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [calDate, setCalDate] = useState(moment());
  const [clockTime, setClockTime] = useState(moment());
  const [isVisible, setIsVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isContainerVisible, setContainerVisible]=useState(true)
  const[isScheduleVisible, setIsScheduleVisible]=useState(true);

  // useEffect( ()=>{
  //   async function fetchPostInfo(){
  //     const response=await fetch(`http://localhost:3000/getPostInfo?id=${id}`,{
  //       method:'GET',
  //       headers:{
  //         'Content-Type':'application/json' },
  //         credentials:'include',

  //     })
  //     const data=await response.json()
  //     // const data_time=moment(data.time).toISOString
  //     // const data_cal=moment(data.calendar).toISOString
  //     // console.log('time', data_time, ' cal', data_cal)
  //     setText(data.text)
  //     setUsername(data.username)
  //     setPassword(data.password)
  //     // setClockTime(data_time)
  //     // setCalDate(moment(data_cal))
  //   }
  //   fetchPostInfo()
  // }, [id])
  const handleChangeText = (event) => {
    setText(event.target.value);
    console.log(text);
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
    //react state changes happen asynchronously so we won't have access to the new change
    //with clockTime right away after setClockTime() runs above. This is because state changes don't happen right away
    // as react typically batches the updates to happen at a later time. This is why
    //we have to use useEffect below, which only runs when clockTime changes. So after
    //the clockTime state changes, we console.log the formatted time.
  };
  // useEffect(()=>{
  //  //when clockTime finishes updating, we store the 12 hr formatted time in ftime and then
  //  // set that as input for a different state, which hasn't been initialized as a moment object

  //   const ftime=clockTime.format("h:mm A")

  //   setFormatTime(ftime)
  // }, [clockTime, formatTime])


  //MOVE TO ANOTHER FILE 
  // const handleEditClick = () => {
  //   setIsDisabled(false);
  //   setIsEditVisible(false);
  //   setIsScheduleVisible(true);
  //   setIsVisible(false);
  // }

  // const handleDeleteClick=async()=>{
  //   setContainerVisible(false)
    
  //   setRenderSwitch((prevCount) => Math.max(prevCount-1,-1)); //doesnt go below -1. It's -1 instead of 0 because
  //   //of the switch statement in Home.jsx. Or else if theres no active posts, then clicking add a post
  //   //results in case going to 1 instead of 0. So minimum is -1 so it would go to 0.

  //   await fetch('http://localhost:3000/deletePost',{
  //     method:'POST',
  //     headers:{
  //       'Content-Type':'application/json',
  //     },
  //     body: JSON.stringify({ text:text}),
  //     credentials:'include',
  //   })
  
    

  // }


  const handleSubmit = async () => {
    setIsVisible(true);
    setIsEditVisible(true);
    setIsDisabled(true);
    setContainerVisible(true);
    setIsScheduleVisible(false);
    
    //another method of convertng time state vs useEffect as above:
    //can't directly format the clock and time states as they are initialized to moment() (can't do setClockTime(newValue.format("h:mm A"))), so we do:
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
    console.log('data ', data);
  };

  return (
    
    <div>

      {isContainerVisible ? (
        <div className="container">
    
        <div className="information">
          <div className="information_sub">
            <div className="bluesky_header">Bluesky Credentials:</div>
            <input
              disabled={isDisabled}
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleChangeUsername}
            />
            <input
              type="text"
              disabled={isDisabled}
              placeholder="Password"
              value={password}
              onChange={handleChangePassword}
            />
          </div>
          <div className="text">
            <textarea
              type="text"
              disabled={isDisabled}
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
              disabled={isDisabled}
              value={calDate}
              onChange={handleChangeCal}
              views={['year', 'month', 'day']}
              shouldDisableDate={(date) => date.isBefore(moment(), 'day')}
            />
          </div>
          <div className="clock">
            <TimePicker
              value={clockTime}
              disabled={isDisabled}
              onChange={handleChangeClock}
              label="Choose a time"
            />
          </div>
          {isScheduleVisible && (
                      <button onClick={handleSubmit}> Schedule Post</button>

          )}
        </div>
        <div className="btncontainer">
          {/* {isVisible && (
            <div className="delete">
              <button onClick={handleDeleteClick}>Delete</button>
            </div>
          )}
          {isEditVisible && (
            <div className="delete">
              <button onClick={handleEditClick}>Edit</button>
            </div>
          )} */}
        </div>
      </div>
      ):(
        <div>

        </div>
      )}
    </div>
    
  );
}

HomeComponent.propTypes={
  setRenderSwitch:PropTypes.func.isRequired,
}
export default HomeComponent;
