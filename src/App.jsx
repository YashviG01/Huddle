import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Components/HomePage'
import Loader from './Components/Loader'
import Api from './Components/Api'
import Logo from './Components/Logo'
import SignUp from './Components/SignUp'
import Meeting from './Components/Meeting';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Logo />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/meeting' element={<Meeting />} />
      </Routes>
    </BrowserRouter >
  )
}

export default App;
