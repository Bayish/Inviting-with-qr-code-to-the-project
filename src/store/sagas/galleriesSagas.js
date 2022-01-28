import {put, takeEvery} from "redux-saga/effects";
import axios from 'axios';
import {
  fetchGalleriesFailure,
  fetchGalleriesRequest,
  fetchGalleriesSuccess,
  removeGalleryRequest,
  removeGallerySuccess,
  removeGalleryFailure,
  fetchGalleryRequest,
  fetchGallerySuccess,
  fetchGalleryFailure,
  createGalleryRequest,
  createGallerySuccess,
  changeGallerySuccess, changeGalleryFailure, changeGalleryRequest, createGalleryFailure
} from "../actions/galleriesActions";
import {historyPush} from "../actions/historyActions";
import {toast} from "react-toastify";
import axiosApi from "../../axiosApi";

export function* fetchGalleriesSaga() {
  try {
    const {data} = yield axiosApi.get('/gallery');
    yield put(fetchGalleriesSuccess(data));
  } catch (err) {
    if (!err.response) toast.error(err.message);
    yield put(fetchGalleriesFailure(err.response?.data));
  }
}

export function* fetchGallerySaga({payload: id}) {
  try {
    const {data} = yield axiosApi.get('/gallery/get/' + id);
    yield put(fetchGallerySuccess(data));
  } catch (err) {
    if (!err.response) toast.error(err.message);
    if (err.response?.data?.global) toast.error(err.response?.data?.global);
    yield put(fetchGalleryFailure(err.response?.data));
  }
}

export function* createGallerySaga({payload: galleryData}) {
  try {
    const {data} = yield axiosApi.post('/gallery/create', galleryData, {headers: {'content-type': "application/json"}});
    yield put(createGallerySuccess(data));
    yield put(historyPush('/'));
    toast.success('You have created successful');
  } catch (err) {
    if (!err.response) toast.error(err.message);
    if (err.response?.data?.global) toast.error(err.response?.data?.global);
    yield put(createGalleryFailure(err.response?.data));
  }
}

export function* removeGallerySaga({payload: id}) {
  try {
    yield axios.delete('http://3.109.39.82:8080/gallery/' + id);
    yield put(removeGallerySuccess(id));
    yield put(historyPush('/'));
    toast.success('You have changed successful');
  } catch (err) {
    if (!err.response) toast.error(err.message);
    if (err.response?.data?.global) toast.error(err.response?.data?.global);
    yield put(removeGalleryFailure(err.response?.data));
  }
}

export function* changeGallerySaga({payload : formData}) {
  try {
    const {data} = yield axiosApi.put('/gallery/update' , formData, {headers: {'content-type': "application/json"}});
    yield put(changeGallerySuccess(data));
    yield put(historyPush('/'));
    toast.success('You have changed successful');
  } catch (err) {
    if (!err.response) toast.error(err.message);
    if (err.response?.data?.global) toast.error(err.response?.data?.global);
    yield put(changeGalleryFailure(err.response?.data));
  }
}


const galleriesSagas = [
  takeEvery(fetchGalleriesRequest, fetchGalleriesSaga),
  takeEvery(fetchGalleryRequest, fetchGallerySaga),
  takeEvery(createGalleryRequest, createGallerySaga),
  takeEvery(removeGalleryRequest, removeGallerySaga),
  takeEvery(changeGalleryRequest, changeGallerySaga),
];

export default galleriesSagas;