import React from 'react';
import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import PersonalAccount from "./pages/PersonalAccount/PersonalAccount";
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/personal" element={<PersonalAccount />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
  );
}

export default App;
