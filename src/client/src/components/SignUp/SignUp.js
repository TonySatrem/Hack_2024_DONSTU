import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
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
import { API_URL } from "../../api/apiConfig";
import axios from "axios";
import { PDFDocument } from 'pdf-lib';
import Compress from 'compressorjs';
import AddMembers from '../AddMembers/AddMembers';
import { ConstructionOutlined } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext"; 
import { imageToBase64 } from "../Converter/Converter";  


const ADD_TEAM = "/teams/add";
const ADD_MEMBERS = "/partisians/add";
window.addEventListener('beforeunload', () => {
  localStorage.removeItem('members');
});

const SignUp = () => {
  // useEffect(() => {
  //   // Читаем токен аутентификации из переменной окружения
  //   const token = process.env.REACT_APP_TOKEN;

  //   // Создаем экземпляр Axios с заголовком аутентификации
  //   const axiosInstance = axios.create({
  //     baseURL: 'https://127.0.0.1:8080/api/',
  //     headers: {
  //       'Authorization': `${token}`
  //     }});
  //   });

  const [errMsg, setErrMsg] = React.useState('');
  const [membersAdded, setMembersAdded] = React.useState(false);

  const navigate = useNavigate();
  const validationSchema = yup.object({
    teamName: yup
      .string()
      .required("Название команды обязательно")
      .max(20, "Максимальная длина 20 символов"),
    login: yup.string().required("Логин команды обязателен для заполнения"),
    password: yup
      .string()
      .required("Пароль обязателен для заполнения")
      .min(8, "Минимальная длина пароля 8 символов")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Пароль должен содержать как минимум одну заглавную букву, одну строчную букву, одну цифру и один специальный символ"
      ),
    email: yup
      .string()
      .email("Некорректный адрес электронной почты")
      .required("Email обязателен для заполнения"),

    confirmPassword: yup
      .string()
      .required("Подтвердите пароль")
      .oneOf([yup.ref("password"), null], "Пароли должны совпадать"),

    banner: yup
      .mixed()
      .required("Баннер обязателен для загрузки")
      .test("fileSize", "Размер файла превышает 2 МБ", (value) => {
        return !value || value.size <= 2 * 1024 * 1024;
      })
      .test(
        "fileFormat",
        "Допустимые форматы: jpeg, png, pdf",
        (value) =>
          value &&
          ["image/jpeg", "image/png", "application/pdf"].includes(value.type)
      ),
    members: yup
      .mixed()
      .test("localStorage", "Элемент 'members' в localStorage не найден или пуст", () => {
        const members = localStorage.getItem("members");
        return members !== null && members.length > 0;
    }),
    
  });
  
  const handleSubmit = async (values) => {
    try {
      if (localStorage.getItem('members').length === 0) {
        setErrMsg('Выберите хотя бы одного участника');
      } else{
      const { teamName, email, login, password, banner } = values;
      // const base64String = await imageToBase64(banner);
      console.log(JSON.stringify({
        name: teamName,
        email,
        login,
        password,
        // banner: base64String,
        banner: banner.name,
      }));
      const response = await axios.post( ADD_TEAM, {
        name: teamName,
        email,
        login,
        password,
        banner: banner.name,
      },{
        timeout: 3000, // Установка времени ожидания в 3 секунды
      });
      console.log('Ответ от сервера:', response);
      localStorage.setItem('teamId', response.data.teamId); // TODO: После этого отправить участников команды из modal окна
      if (response.data.status === 'success') {
        addingMembers();
      }
  }
      
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
      throw error;
    }
  };

  const handleAddMembers = () => {
    const members = JSON.parse(localStorage.getItem('members'));
    if (members && members.length > 0) {
      setMembersAdded(true);
    }
    else {
      setMembersAdded(false);
    }
  };  

  const addingMembers = () => {
    const members = JSON.parse(localStorage.getItem('members'));
    const countMembers = members.length;
    for (let i = 0; i < countMembers; i++) {
      const member = members[i];
      const values = {
        fullName: member.fullName,
        email: member.email,
        info: member.info,
        teamId: localStorage.getItem('teamId'),
        photo: member.photo,
      };
      handleSubmitMembers(values);
    }
  };

  const handleSubmitMembers = async (values) => {
    try {
      console.log(values);
      const response = await axios.post(API_URL + ADD_MEMBERS, values);
      console.log('Ответ от сервера:', response);
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
      throw error;
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      login: "",
      password: "",
      email: "",
      banner: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });
  useEffect(() => {
    localStorage.setItem('members', JSON.stringify([]));
    
  } , []);

  return (
    <Container component="main" maxWidth="xs" maxHeight="110vh">
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
            Регистрация команды
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3 }}
          >
            <TextField
              margin="normal"
              autoComplete="team-name"
              name="teamName"
              required
              fullWidth
              id="teamName"
              label="Название команды"
              autoFocus
              value={formik.values.teamName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.teamName && Boolean(formik.errors.teamName)}
              helperText={formik.touched.teamName && formik.errors.teamName}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="login"
              label="Логин команды"
              name="login"
              autoComplete="login"
              value={formik.values.login}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.login && Boolean(formik.errors.login)}
              helperText={formik.touched.login && formik.errors.login}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Подтвердите пароль"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Почта"
              name="email"
              autoComplete="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <Box
              sx={{
                mt: 1,
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                component="label"
                sx={{ backgroundColor: "#9747FF", color: "white" }}
                onBlur={formik.handleBlur("banner")}
              >
                Загрузить баннер
                <input
                  type="file"
                  hidden
                  onChange={(event) =>
                    formik.setFieldValue("banner", event.currentTarget.files[0])
                  }
                />
              </Button>
              {formik.touched.banner && formik.errors.banner && (
                <Box sx={{ color: "red", marginLeft: 1, fontSize: "12px" }}>
                  {formik.errors.banner}
                </Box>
              )}
            </Box>
            <br/>
            <Box
              sx={{
                mt: 1,
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
              }}  
            >
              {errMsg && (
                <Box sx={{ color: "red", marginLeft: 1, fontSize: "12px" }}>
                  {errMsg}
                </Box>
              )}
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#9747FF",
                color: "white",
              }}
              disabled={!formik.isValid }
            >
              Зарегистрироваться
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  href="/signin"
                  variant="body2"
                  sx={{ color: "#9747FF", textDecoration: "none" }}
                >
                  Уже есть аккаунт? Войти
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
