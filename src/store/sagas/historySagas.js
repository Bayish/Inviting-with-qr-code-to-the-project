import {takeEvery} from "redux-saga/effects";
import {historyBack, historyPush, historyReplace} from "../actions/historyActions";
import history from "../../history";

export function* historyPushSaga({payload}) {
  try {
    history.push(payload)
  } catch (err) {
    console.log('historyPushSaga error');
  }
}
export function* historyReplaceSaga({payload}) {
  try {
    history.replace(payload)
  } catch (err) {
    console.log('historyReplaceSaga error');
  }
}
export function* historyBackSaga() {
  try {
    history.goBack();
  } catch (err) {
    console.log('historyBackSaga error');
  }
}

const historySagas = [
  takeEvery(historyPush, historyPushSaga),
  takeEvery(historyReplace, historyReplaceSaga),
  takeEvery(historyBack, historyBackSaga),
];

export default historySagas;