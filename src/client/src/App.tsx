import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import PersonalAccount from "./pages/PersonalAccount/PersonalAccount";
import Header from "./components/Header/Header";
import { AuthProvider } from "./context/AuthContext";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { darkTheme, lightTheme } from "./utils/theme"; // Импортируем темы

const App: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState(lightTheme); // Состояние для текущей темы

  const toggleTheme = () => {
    // Если текущая тема - светлая, то переключаем на темную, и наоборот
    setCurrentTheme(currentTheme === lightTheme ? darkTheme : lightTheme);
  };

  return (
      <AuthProvider>
        {/* Обертываем приложение в ThemeProvider, передавая в него текущую тему */}
        <ThemeProvider theme={currentTheme}>
          <Header toggleTheme={toggleTheme} /> {/* Передаем функцию для переключения темы в компонент Header */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/personal" element={<PersonalAccount />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
  );
};

export default App;
