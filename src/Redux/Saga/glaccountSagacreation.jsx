import { call, put, takeLatest } from "redux-saga/effects";
import {
  getGlAccountListSuccess,
  getGlAccountError,
  postGlcreationSuccess,
  postGlcreationError,
  getGlcurrencySuccess,
  getGlcurrencyError,  
} from "../Action/glaccountcreation";
import * as actions from "../constant";
import axiosCall from "../../services/index";
import { API } from "../../services/api";

// function* fetchDataSaga(action) {
//   try {
//     const response = yield call(axiosCall, "POST", API.FETCHGLACCOUNT,action.payload);
//     if (response?.data?.status == 500) {
//       yield put(getGlAccountError({Data: response?.data}));
//     } else {
//       yield put(getGlAccountListSuccess({ Data: response?.data }));
//     }
//   } catch (e) {
//     yield put(getGlAccountError(e.message));
//   }
// }

// export function* GlAccount() {
//   yield takeLatest(actions.GET_GLACCOUNT_REQUEST, fetchDataSaga);
// }


function* insertDataSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.INSERTGLDATA,action.payload);
    if (response?.status == 200) {
      yield put(postGlcreationSuccess({ Data: response?.data }));
    } else {
      yield put(postGlcreationError(response?.data?.message));
    }
  } catch (e) {
    yield put(postGlcreationError(e.message));
  }
}

export function* GlAccountcreation() {
  yield takeLatest(actions.POST_GLCREATION_REQUEST, insertDataSaga);
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
