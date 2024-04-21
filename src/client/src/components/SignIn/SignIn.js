import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { API_URL } from "../../api/apiConfig";
import axios from "axios";

const URL_LOGIN = "/teams/auth";

export default function SignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const login = event.target.login.value;
    const password = event.target.password.value;
    console.log(JSON.stringify({
      login,
      password
    }));
    const response = await axios.post(API_URL + URL_LOGIN, {
      login,
      password,
    })
    localStorage.setItem('team', response.data);
    login();
    navigate('/personal');
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "80vh",
          }}
      >
        <Box
          sx={{
            mt: 2,
            mb: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid rgba(0, 0, 0, 0.4)", // Линия границы
            borderRadius: "16px", // Радиус скругления
            boxShadow: "0px 0px 7px rgba(0, 0, 0, 0.3)", // Тень
            padding: "20px", // Дополнительный отступ внутри контейнера
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Войти
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="login"
              label="Логин команды"
              name="login"
              autoComplete="login"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#9747FF", color: "white" }}
            >
              Войти
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  href="/signup"
                  variant="body2"
                  sx={{ color: "#9747FF", textDecoration: "none" }}
                >
                  Регистрация
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
