import {put, takeEvery} from "redux-saga/effects";
import {
  logInUser, logInUserFailure,
  logInUserSuccess, logOutUser, logOutUserSuccess,
} from "../actions/usersActions";
import {historyPush} from "../actions/historyActions";
import {toast} from "react-toastify";
import axiosApi from "../../axiosApi";

export function* logInUserSaga({payload: userData}) {
  try {
    console.log(userData)
    const {data} = yield axiosApi.post("/auth/login", userData);
    yield put(logInUserSuccess(data));
    console.log(data)
    yield put(historyPush('/'));
  } catch (err) {
    if (!err.response) toast.error(err.message);
    if (err.response?.data?.global) toast.error(err.response?.data?.global);
    yield put(logInUserFailure(err.response?.data));
  }
}
export function* logOutUserSaga() {
  try {
    yield put(logOutUserSuccess());
    yield put(historyPush('/'));
    toast.success('Вы успешно вышли из системы');
  } catch (err) {
    if (!err.response) toast.error(err.message);
  }
}

const usersSagas = [
  takeEvery(logInUser, logInUserSaga),
  takeEvery(logOutUser, logOutUserSaga),
];

export default usersSagas;