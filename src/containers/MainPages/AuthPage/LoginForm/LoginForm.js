import React, {useState} from 'react';
import {Avatar, Stack, TextField, Typography} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import {LoadingButton} from "@mui/lab";

const initialState = {
  email: '',
  password: '',
}

const LoginForm = ({handleSubmit, errLogIn,  submitLoading}) => {

  const [userData, setUserData] = useState(initialState);

  const inpChanger = (e) => {
    setUserData(prevState => ({...prevState, [e.target.name]: e.target.value}));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(userData);
  }

  return (
    <Stack component={"form"}
           onSubmit={onSubmit}
           maxWidth={500}
           noValidate
           spacing={2}
           mx={"auto"}
           my={2}
           px={1}
    >
      <Avatar sx={{m: '10px auto', bgcolor: 'primary.main'}}>
        <LoginIcon/>
      </Avatar>
      <Typography component="h3"
                  variant="h5"
                  textAlign={"center"}
      >
        Вход
      </Typography>
      <TextField
        type={"email"}
        name={"email"}
        error={Boolean(errLogIn)}
        helperText={errLogIn}
        label={'Почта'}
        onChange={inpChanger}
        value={userData.email}
        sx={{background: "white"}}
        autoFocus
      />
      <TextField
        name={"password"}
        type={"password"}
        error={Boolean(errLogIn)}
        helperText={errLogIn}
        label={'Пароль'}
        onChange={inpChanger}
        value={userData.password}
        sx={{background: "white"}}
      />
      <LoadingButton type={"submit"}
                     variant={"contained"}
                     loading={submitLoading}
      >
        Войти
      </LoadingButton>
    </Stack>
  );
};

export default LoginForm;