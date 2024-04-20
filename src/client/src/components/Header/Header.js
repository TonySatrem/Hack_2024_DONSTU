import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Импортируем хук для использования контекста аутентификации
import { useNavigate } from "react-router-dom";
import { darkTheme, lightTheme } from "../../utils/theme"; // Импортируем темы
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
const pages = [{ name: "Главная", path: "/" }];
const settings = [
    { name: "Команда", path: "/personal" },
    // { name: "Выход", path: "/signout" },
];

function Header({ toggleTheme }) {
    const { isAuthenticated, logout } = useAuth(); // Используем хук для получения состояния аутентификации
    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [isDarkTheme, setIsDarkTheme] = useState(true); // Состояние для темной темы

    const handleLogout = (event) => {
        // Обработчик выхода из системы
        handleCloseUserMenu();
        logout();
        navigate('/');
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // const toggleTheme = () => {
    //     setIsDarkTheme(!isDarkTheme);
    // };

    // useEffect(() => {
    //     // Здесь вы можете применить выбранную тему к вашему приложению
    //     document.body.style.backgroundColor = isDarkTheme ? darkTheme.palette.background.default : lightTheme.palette.background.default;
    // }, [isDarkTheme]);

    return (
        <AppBar position="static" sx={{ backgroundColor: "#9747FF", color: "white", fontWeight: "semi-bold" }}>
            <Container maxWidth="xl" sx={{ p: 0 }}>
                <Toolbar sx={{ p: 0 }} disableGutters>
                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton
                            size="large"
                            aria-label="menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                            sx={{ display: { xs: "block", md: "none" } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Button
                            component={Link}
                            to={pages[0].path}
                            color="inherit"
                            sx={{
                                display: { xs: "none", md: "block" },
                                paddingY: 1.5,
                                ":hover": { backgroundColor: "#7436C5", color: "white" },
                            }}
                        >
                            {pages[0].name}
                        </Button>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: "block", md: "none" } }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                    <Typography component={Link} to={page.path} textAlign="center" >
                                        {page.name}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1 }} />

                    <Box sx={{ flexGrow: 0, m: 1 }} display="flex" alignItems="center">
                        {isAuthenticated ? (
                            <>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: "45px" }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                                            <Typography component={Link} to={setting.path} textAlign="center" sx={{ textDecoration: "none", color: "black" }}>
                                                {setting.name}
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                    <MenuItem onClick={handleLogout}>
                                        <Typography textAlign="center" sx={{color: "black"}}>Выход</Typography>
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Button
                                component={Link}
                                to="/signin"
                                color="inherit"
                                sx={{
                                    display: "block",
                                    paddingY: 1.5,
                                    ":hover": { backgroundColor: "#7436C5", color: "white" }
                                }}
                            >
                                Войти
                            </Button>
                        )}
                    </Box>
                    <Button
                        onClick={toggleTheme}
                        color="inherit"
                        sx={{
                            display: "block",
                            paddingY: 1.5,
                            ":hover": { backgroundColor: "#7436C5", color: "white" }
                        }}
                    >
                        {isDarkTheme ? "🌞" : "🌚"}
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;
