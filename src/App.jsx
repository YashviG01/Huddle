import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Components/HomePage'
// import Loader from './Components/Loader'
// import Api from './Components/Api'
import Logo from './Components/Logo'
import SignUp from './Components/SignUp'
import Loginform from './Components/Loginform'
import Newpassword from './Components/Newpassword'
import Resetpassword from './Components/Resetpassword '

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Logo />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Loginform " element={<Loginform  />} />
        <Route path="Resetpassword" element={<Resetpassword />} />
        <Route path="/Newpassword" element={<Newpassword/>} />
        <Route path="/HomePage" element={<HomePage />} />

      </Routes>
    </BrowserRouter >
  )
}

export default App;