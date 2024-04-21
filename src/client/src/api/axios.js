import axios from 'axios';
require('dotenv').config(); // Импортируем и активируем dotenv

dotenv.config(); // Активируем dotenv

const token = process.env.REACT_APP_TOKEN;
console.log('Токен аутентификации:', token);

const axiosInstance = axios.create({
  baseURL: 'https://127.0.0.1:8080/api/',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

