import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Components/HomePage'
import Redirect from "./Components/Redirect";
import VideoRoom from "./Components/VideoRoom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomePage />} /> 
      <Route path="/redirect" element={<Redirect />} />
      <Route path="/VideoRoom" element={<VideoRoom />} />

      </Routes>
    </BrowserRouter >
  )
}

export default App;