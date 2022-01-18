import store from "./store/configurateStore";
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {ToastContainer} from "react-toastify";
import history from "./history";
import App from './App';
import {Router} from "react-router-dom";
import {createTheme} from "@mui/material";
import 'react-toastify/dist/ReactToastify.css';
import {ThemeProvider} from "@mui/styles";
import './index.css';

const theme = createTheme();

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <ToastContainer
          position={"bottom-right"}
        />

        <App/>
      </Router>
    </ThemeProvider>
  </Provider>
  , document.getElementById('root')
);

