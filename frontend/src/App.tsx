import React from 'react';
import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import SignIn from './components/SignIn/SignIn';
import PersonalAccount from "./pages/PersonalAccount/PersonalAccount";

function App() {
  return (
    <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
              <Route path="/personal" element={<PersonalAccount />} />
              <Route path="/signin" element={<SignIn />} />
          </Routes>

    </div>
  );
}

export default App;
