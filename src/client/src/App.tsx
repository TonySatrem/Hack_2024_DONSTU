import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import PersonalAccount from "./pages/PersonalAccount/PersonalAccount";
import Header from "./components/Header/Header";
import { AuthProvider } from "./context/AuthContext";
import { createTheme, ThemeProvider, styled, Theme} from '@mui/material/styles';
import {darkTheme, lightTheme} from "./utils/theme"; // Импортируем темы

const App: React.FC = () => {
  const saveThemeToLocalStorage = (theme: Theme) => {
    localStorage.setItem('currentTheme', theme === lightTheme ? 'light' : 'dark');
  };

// Функция для загрузки сохраненной темы из локального хранилища
  const loadThemeFromLocalStorage = () => {
    const savedTheme = localStorage.getItem('currentTheme');
    return savedTheme === 'light' ? lightTheme : darkTheme;
  };
  const [currentTheme, setCurrentTheme] = useState(loadThemeFromLocalStorage()); // Состояние для текущей темы

  useEffect(() => {
    // При каждом изменении текущей темы сохраняем ее в локальное хранилище
    saveThemeToLocalStorage(currentTheme);
  }, [currentTheme]);

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