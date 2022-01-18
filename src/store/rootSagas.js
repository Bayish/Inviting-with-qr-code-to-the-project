import {all} from 'redux-saga/effects';
import historySagas from "./sagas/historySagas";
import usersSagas from "./sagas/usersSagas";
import galleriesSagas from './sagas/galleriesSagas';

export function* rootSagas() {
  yield all([
    ...usersSagas,
    ...galleriesSagas,
    ...historySagas,
  ])
}