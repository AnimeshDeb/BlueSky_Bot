import './App.css'
import {Routes, Route} from 'react-router-dom'
import Landing from './Routes/Landing'
import Login from './Routes/Login'
import Signup from './Routes/Signup'
import Home from './Routes/Home'
function App() {
  return(
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/home" element={<Home/>}/>
    </Routes>
  )
}

export default App
