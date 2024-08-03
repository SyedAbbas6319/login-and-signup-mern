import './App.css';
import Homepage from "./components/homepage/Homepage";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function App() {
  const [user, setLoginUser] = useState({});

  const logoutUser = async () => {
    try {
      await axios.post("http://localhost:3000/auth/logout", {}, { withCredentials: true });
      setLoginUser({});
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={user && user._id ? <Homepage user={user} logout={logoutUser} /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
