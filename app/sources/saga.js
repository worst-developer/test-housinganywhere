import { fork } from 'redux-saga/effects';
import checkSaga from './containers/HomePage/sagas'

export default function* rootSaga() {
  yield fork(checkSaga)
}
