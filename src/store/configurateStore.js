import {combineReducers} from "redux";
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";
import createSagaMiddleware from 'redux-saga';
import {configureStore} from "@reduxjs/toolkit";
import {rootSagas} from "./rootSagas";
import usersSlice, {initialState} from "./slices/usersSlice";
import galleriesSlice from './slices/galleriesSlice';
import axiosApi from "../axiosApi";

const rootReducer = combineReducers({
  users: usersSlice.reducer,
  galleries: galleriesSlice.reducer,
});
const persistedState = loadFromLocalStorage();

const sagaMiddleware = createSagaMiddleware();

const middleware = [
  sagaMiddleware,
];

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: true,
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveToLocalStorage({
    users: {
      ...initialState,
      user: store.getState().users.user
    },
  });
});

sagaMiddleware.run(rootSagas);


axiosApi.interceptors.request.use(config => {
  try {
    config.headers['Authorization'] = `Bearer ${store.getState().users?.user?.accessToken}`
  } catch (e) {}
  return config;
});

axiosApi.interceptors.response.use(res => res, e => {
  if (!e.response) {
    e.response = {data: {global: 'No internet'}};
  }

  throw e;
});

export default store;