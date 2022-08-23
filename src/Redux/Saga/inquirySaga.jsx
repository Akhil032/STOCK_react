import { call, put, takeLatest } from "redux-saga/effects";
import {
  getInquiryDataSuccess,
  getInquiryDataError,
  getClassDataSuccess,
  getClassDataError,
} from "../Action/inquiry";
import * as actions from "../constant";
import axiosCall from "../../services/index";
import { API } from "../../services/api";

function* fetchDataSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.FETCHERRSTAGESATA,action.payload);
    console.log("res",response);
    if (response?.data?.status == 500) {
      yield put(getInquiryDataError({Data: response?.data}));
    } else {
      yield put(getInquiryDataSuccess({ Data: response?.data }));
    }
  } catch (e) {
    yield put(getInquiryDataError(e.message));
  }
}

export function* InquiryData() {
  yield takeLatest(actions.GET_INQUIRYDATA_REQUEST, fetchDataSaga);
}

function* getClassDataSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.GETHIER2DATA,action.payload);
    //console.log(response);
    if (response?.status === 200) {
      yield put(getClassDataSuccess({ itemData: response?.data }));
    } else {
      yield put(getClassDataError(response?.data?.message));
    }
  } catch (e) {
    yield put(getClassDataError(e.message));
  }
}

export function* getClassDataTrans() {
  yield takeLatest(actions.GET_HIER2DATA_REQUEST, getClassDataSaga);
}