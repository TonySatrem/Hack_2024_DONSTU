import React from 'react';
import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import PersonalAccount from "./pages/PersonalAccount/PersonalAccount";

function App() {
  return (
    <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
              <Route path="/personal" element={<PersonalAccount />} />
          </Routes>

    </div>
  );
}

export default App;
