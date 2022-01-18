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
  createGalleryFailure
} from "../actions/galleriesActions";
import {historyPush} from "../actions/historyActions";
import {toast} from "react-toastify";
import axiosApi from "../../axiosApi";

export function* fetchGalleriesSaga() {
  try {
    const {data} = yield axiosApi.get('/gallery');
    yield put(fetchGalleriesSuccess(data));
  } catch (err) {
    console.log(err)
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
    const requestOptions = {
      method: 'POST',
      body: galleryData
    };
    fetch('http://3.109.39.82/gallery/create', requestOptions)
      .then(async response => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();

        if (!response.ok) {
          const error = (data && data.message) || response.status;
          createGalleryFailure(error)
          return Promise.reject(error);
        }

        historyPush('/');

        createGallerySuccess(data)
      })
      .catch(error => {
        console.error('Error while uploading file!', error);
      });
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




const galleriesSagas = [
  takeEvery(fetchGalleriesRequest, fetchGalleriesSaga),
  takeEvery(fetchGalleryRequest, fetchGallerySaga),
  takeEvery(createGalleryRequest, createGallerySaga),
  takeEvery(removeGalleryRequest, removeGallerySaga),
];

export default galleriesSagas;