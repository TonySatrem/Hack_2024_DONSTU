import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit'; 
import Paper from '@mui/material/Paper';
import { API_URL } from "../../api/apiConfig";


const URL_TEAM = `/teams/${localStorage.getItem('teamId')}`;
export default function Banner() {
    const [userData, setUserData] = useState({
        "id": 0,
        "name": "",
        "login": "",
        "password": "",
        "banner": "https://preview.redd.it/5gqcxtsn1mi11.jpg?width=640&crop=smart&auto=webp&s=b776bc0031874f6643d20f9f1965865b95adb174",
        "designVotes": "",
        "usabilityVotes": "",
        "layoutVotes": "",
        "realizationVotes": "",
        "email": ""
    });

    useEffect(() => {
        console.log(API_URL + URL_TEAM);
        const fetchUserData = async () => {
            try {
                const response = await axios.get(API_URL + URL_TEAM); // Выполняем GET запрос к эндпоинту /api/teams/1/
                setUserData(response.data); // Устанавливаем полученные данные в состояние
                console.log('Ответ от сервера:', response);
                console.log('userData:', userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData(); // Вызываем функцию fetchUserData при монтировании компонента
    }, []);

    const handleEditBanner = () => {
        console.log('Edit banner clicked');
    };

    return (
        <Container maxWidth="lg" sx={{
            boxShadow: 10,
            borderRadius: 2,
            p: 2,
            minWidth: 300,
            minHeight: 400,
            width: '100%',
            height: 'fit-content',
            position: 'relative', // Добавлено для позиционирования иконки
            backgroundImage: `url(${userData.banner})`, // Используем изображение из userData
            
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',

        }}>
            <Paper sx={{
                position: 'relative',
                height: '100%', // Устанавливаем автоматическую высоту
                width: '100%', // Устанавливаем автоматическую высоту
            }}>
                <Box
                    sx={{
                        position: 'absolute', // Абсолютное позиционирование
                        top: 0, // Выравнивание по верхнему краю
                        right: 0, // Выравнивание по правому краю
                        padding: 1, // Добавляем небольшой отступ
                    }}
                    onClick={handleEditBanner}
                >
                    <EditIcon sx={{ cursor: 'pointer' }} />
                </Box>
            </Paper>
        </Container>
    );
}
