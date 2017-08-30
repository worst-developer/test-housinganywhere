import { call, put, takeEvery } from 'redux-saga/effects';
import { CHECK_REQUEST, 
         CHECK_SUCCESS, 
         CHECK_FAIL,
         SUBMIT_FAIL,
         SUBMIT_REQUEST,
         SUBMIT_SUCCESS
} from './constants';
import httpPost from '../../utils/FetchApi';

function* fetchInput(action) {
   try {
      const checkInputData = yield call(httpPost, 'http://localhost:5555/check', action.payload);
      yield put({type: CHECK_SUCCESS, response: 'success' });
   } catch (error) {
      yield put({type: CHECK_FAIL, response: error.response.data});
   }
}

function* fetchSubmit(action) {
  try {
     const requestSubmit = yield call(httpPost, 'http://localhost:5555/submit', action.payload);
     yield put({type: SUBMIT_SUCCESS, response: 'success' });
  } catch (error) {
     yield put({type: SUBMIT_FAIL, response: error.response.data});
  }
}

function* checkSaga() {
  yield takeEvery(CHECK_REQUEST, fetchInput);
  yield takeEvery(SUBMIT_REQUEST, fetchSubmit);
}

export default checkSaga;