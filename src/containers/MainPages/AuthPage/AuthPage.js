import React, {useEffect} from 'react';
import {Container} from "@mui/material";
import LoginForm from "./LoginForm/LoginForm";
import {useDispatch, useSelector} from "react-redux";
import {logInUser, logInUserFailure} from "../../../store/actions/usersActions";

const AuthPage = () => {
  const dispatch = useDispatch();
  const errLogIn = useSelector(state => state.users.errLogIn);
  const logInLoading = useSelector(state => state.users.logInLoading);


  const loginSubmitHandler = (data) => {
    dispatch(logInUser(data));
  };

  useEffect(() => {
    dispatch(logInUserFailure(null));
  }, [dispatch])


  return (
    <Container sx={{padding: "20px 0"}}>
      <LoginForm
        errLogIn={errLogIn?.errors?.message}
        handleSubmit={loginSubmitHandler}
        submitLoading={logInLoading}
      />
    </Container>
  );
};

export default AuthPage;

