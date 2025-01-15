import './App.css'
import {Routes, Route} from 'react-router-dom'
import Home from './Routes/Home'
import Login from './Routes/Login'
import Signup from './Routes/Signup'
function App() {
  return(
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
    </Routes>
  )
}

export default App
