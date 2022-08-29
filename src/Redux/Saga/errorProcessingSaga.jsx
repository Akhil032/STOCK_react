import { call, put, takeLatest } from "redux-saga/effects";
import {
  getErrorProcessingListSuccess,
  getErrorProcessingError,
  postErrorProcessingSucess,
  postErrorProcessingError,
  getClassDataSuccess,
  getClassDataError,
  getLocationDataSuccess,
  getLocationDataError,
} from "../Action/errorProcessing";
import * as actions from "../constant";
import axiosCall from "../../services/index";
import { API } from "../../services/api";

function* fetchDataSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.FETCHERRORDATA,action.payload);
    if (response?.data?.status == 500) {
      yield put(getErrorProcessingError({Data: response?.data}));
    } else {
      yield put(getErrorProcessingListSuccess({ Data: response?.data }));
    }
  } catch (e) {
    yield put(getErrorProcessingError(e.message));
  }
}

export function* ErrorProcessing() {
  yield takeLatest(actions.GET_ERRORPROCESSING_REQUEST, fetchDataSaga);
}


function* updateDataSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.UPDATEERRORDATA,action.payload);
    if (response?.status == 200) {
      yield put(postErrorProcessingSucess({ Data: response?.data }));
    } else {
      yield put(postErrorProcessingError(response?.data?.message));
    }
  } catch (e) {
    yield put(postErrorProcessingError(e.message));
  }
}

export function* updateErrorProcessing() {
  yield takeLatest(actions.POST_ERRORPROCESSING_REQUEST, updateDataSaga);
}

function* getClassDataSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.GETHIER2DATA,action.payload);
    //console.log(response);
    if (response?.status == 200) {
      yield put(getClassDataSuccess({ itemData: response?.data }));
    } else {
      yield put(getClassDataError(response?.data?.message));
    }
  } catch (e) {
    yield put(getClassDataError(e.message));
  }
}

export function* getClassData() {
  yield takeLatest(actions.GET_HIER2DATA_REQUEST, getClassDataSaga);
}

function* getLocationDataSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.GETLOCATIONDATA,action.payload);
    //console.log(response);
    if (response?.status == 200) {
      yield put(getLocationDataSuccess({ locationData: response?.data }));
    } else {
      yield put(getLocationDataError(response?.data?.message));
    }
  } catch (e) {
    yield put(getLocationDataError(e.message));
  }
}

export function* getLocationData() {
  yield takeLatest(actions.GET_LOCATIONDATA_REQUEST, getLocationDataSaga);
}
