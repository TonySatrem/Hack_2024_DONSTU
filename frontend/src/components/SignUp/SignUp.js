import React from "react";
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
import Header from "../Header/Header";

const SignUp = () => {
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
        // Проверяем, выбран ли файл и его размер
        return !value || value.size <= 2 * 1024 * 1024;
      })
    //   .test(
    //     "fileSize",
    //     "Файл должен быть не более 2MB",
    //     (value) => {
    //         console.log("File size:", value.size);
    //         return value && value.size <= 2000000;
    //       }
    
    //   )
      .test(
        "fileFormat",
        "Допустимые форматы: jpeg, png, pdf",
        (value) =>
          value &&
          ["image/jpeg", "image/png", "application/pdf"].includes(value.type)
      ),
      
  });

  const handleSubmit = (values) => {
    console.log(values);
    // Отправка данных на сервер
  };

  const formik = useFormik({
    initialValues: {
      teamName: "",
      login: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Container component="main" maxWidth="xs" maxHeight="110vh">
      <CssBaseline />
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          mt: 10,
          mb: "10px",
        }}
      >
        <Box
          sx={{
            marginTop: 8,
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
                  onChange={(event) => formik.setFieldValue("banner", event.currentTarget.files[0])}

                />
              </Button>
              {console.log(formik.errors)}
              {console.log(formik.touched)}
              {formik.touched.banner && formik.errors.banner && (
                <Box sx={{ color: "red", marginLeft: 1, fontSize: '12px' }}>{formik.errors.banner}</Box>
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
              disabled={!formik.isValid}
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
