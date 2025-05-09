import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './Routes/Login';
import Signup from './Routes/Signup';
import Routeguard from './Routeguard/Routeguard';
import Posts from './Routes/Posts';
import HomeComponent from './Routes/homeComponent'
import ForgotPassword from './Routes/forgotPassword';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Routeguard><HomeComponent /> </Routeguard>} />

      {/* <Route path="/home" element={<Routeguard><Home /> </Routeguard>} /> */}
      <Route path="/posts" element={<Routeguard><Posts/></Routeguard>} />
      <Route path="/forgotPassword" element={<ForgotPassword/>}/>
    </Routes>
  );
}

export default App;
