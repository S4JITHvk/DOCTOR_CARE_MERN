import { Routes, Route ,Navigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from "react";
import Login from "./Pages/Users/Login"
import Signup from "./Pages/Users/Signup"
import Otp from "./components/Otp/Otp"
import Email from "./components/Otp/Emailform"

function App() {
  return (
    <Routes>
    <Route path="/login" element={<Login/>} />
    <Route path="/usersignup" element={<Signup/>}/>
    <Route path="/Otp" element={<Otp/>}/>
    <Route path="/emailfrom" element={<Email/>}/>
    </Routes>
  )
}

export default App
