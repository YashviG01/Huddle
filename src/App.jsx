import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loginform from "./Components/Loginform";
import ResetPassword from "./Components/ResetPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loginform />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
