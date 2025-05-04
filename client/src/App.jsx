import './App.css';
import { Routes, Route } from 'react-router-dom';
import Landing from './Routes/Landing';
import Login from './Routes/Login';
import Signup from './Routes/Signup';
import Home from './Routes/Home';
import Routeguard from './Routeguard/Routeguard';
import Posts from './Routes/Posts';
import HomeComponent from './Routes/homeComponent'
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Routeguard><HomeComponent /> </Routeguard>} />

      {/* <Route path="/home" element={<Routeguard><Home /> </Routeguard>} /> */}
      <Route path="/posts" element={<Routeguard><Posts/></Routeguard>} />
    </Routes>
  );
}

export default App;
