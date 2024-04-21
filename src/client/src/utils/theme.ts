import { createTheme } from '@mui/material/styles';

// Тема для темной темы
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#403c46',
        },
        secondary: {
            main: '#5c4065',
        },
    },
});

// Тема для светлой темы
const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#9747FF',
        },
    },
});

export { darkTheme, lightTheme };
