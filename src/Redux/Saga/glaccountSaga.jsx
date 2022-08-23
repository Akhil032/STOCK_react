import { call, put, takeLatest } from "redux-saga/effects";
import {
  getGlAccountListSuccess,
  getGlAccountError,
  postGlAccountSuccess,
  postGlAccountError,
  getGlcurrencySuccess,
  getGlcurrencyError,  
} from "../Action/glaccount";
import * as actions from "../constant";
import axiosCall from "../../services/index";
import { API } from "../../services/api";

function* fetchDataSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.FETCHGLACCOUNT,action.payload);
    if (response?.data?.status == 500) {
      yield put(getGlAccountError({Data: response?.data}));
    } else {
      yield put(getGlAccountListSuccess({ Data: response?.data }));
    }
  } catch (e) {
    yield put(getGlAccountError(e.message));
  }
}

export function* GlAccount() {
  yield takeLatest(actions.GET_GLACCOUNT_REQUEST, fetchDataSaga);
}


function* updateDataSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.UPDATEGLACCOUNT,action.payload);
    if (response?.status == 200) {
      yield put(postGlAccountSuccess({ Data: response?.data }));
    } else {
      yield put(postGlAccountError(response?.data?.message));
    }
  } catch (e) {
    yield put(postGlAccountError(e.message));
  }
}

export function* updateGlAccount() {
  yield takeLatest(actions.POST_GLACCOUNT_REQUEST, updateDataSaga);
}
function* fetchcurrencydatasaga() {
  try {
    console.log("v",API.GETGLDATA,API.FETCHGLACCOUNT,API.UPDATEGLACCOUNT)
    const response = yield call(axiosCall, "POST", API.GETGLDATA,'');
    console.log("t",response)
    if (response?.data?.status == 500) {
      yield put(getGlcurrencyError({CURRENCYDATA: response?.data}));
    } else {
      yield put(getGlcurrencySuccess({ CURRENCYDATA: response?.data }));
    }
  } catch (e) {
    yield put(getGlcurrencyError(e.message));
  }
}
export function* GLcurrency(){
  yield takeLatest(actions.GET_GLCURRENCY_REQUEST,fetchcurrencydatasaga)
}
