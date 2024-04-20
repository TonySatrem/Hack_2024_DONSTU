import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import axios from 'axios';

export default function Banner() {
    const [userData, setUserData] = useState({
        "id": 0,
        "name": "",
        "login": "",
        "password": "",
        "banner": "",
        "designVotes": "",
        "usabilityVotes": "",
        "layoutVotes": "",
        "realizationVotes": "",
        "email": ""
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/teams/1/'); // Выполняем GET запрос к эндпоинту /api/teams/1/
                setUserData(response.data); // Устанавливаем полученные данные в состояние
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData(); // Вызываем функцию fetchUserData при монтировании компонента
    }, []);

    return (
        <Container maxWidth="lg" sx={{
            bgcolor: 'background.paper',
            boxShadow: 10,
            borderRadius: 2,
            p: 2,
            minWidth: 300,
            maxHeight: 500,
        }}>
            <Box sx={{ width: '100%' }}>
                {userData && (
                    <img src={`data:image/jpeg;base64,${userData.banner}`} alt="banner" />
                )}
            </Box>
        </Container>
    );
}
