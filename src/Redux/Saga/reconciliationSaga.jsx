import { call, put, takeLatest } from "redux-saga/effects";
import {
  getDailySkuRollupDataSuccess,
  getDailySkuRollupDataError,
  getDeptRecDataSuccess,
  getDeptRecDataError,
  getLocationRecDataSuccess,
  getLocationRecDataError,
} from "../Action/reconciliation";
import * as actions from "../constant";
import axiosCall from "../../services/index";
import { API } from "../../services/api";

function* fetchDataSaga(action) {
  try {
    const response = yield call(
      axiosCall,
      "POST",
      API.FETCHDAILYRECDATA,
      action.payload
    );
    if (response?.data?.status == 500) {
      yield put(getDailySkuRollupDataError({ Data: response?.data }));
    } else {
      yield put(getDailySkuRollupDataSuccess({ Data: response?.data }));
    }
  } catch (e) {
    yield put(getDailySkuRollupDataError(e.message));
  }
}

export function* DailySkuRollupData() {
  yield takeLatest(actions.GET_DAILY_SKU_ROLLUPDATA_REQUEST, fetchDataSaga);
}

function* getDeptDataSaga(action) {
  try {
    const response = yield call(
      axiosCall,
      "POST",
      API.GETHIER2DATA,
      action.payload
    );
    //console.log(response);
    if (response?.status == 200) {
      yield put(getDeptRecDataSuccess({ itemData: response?.data }));
    } else {
      yield put(getDeptRecDataError(response?.data?.message));
    }
  } catch (e) {
    yield put(getDeptRecDataError(e.message));
  }
}

export function* getDeptRecData() {
  yield takeLatest(actions.GET_HIER1RECDATA_REQUEST, getDeptDataSaga);
}

function* getLocationRecDataSaga(action) {
  try {
    const response = yield call(
      axiosCall,
      "POST",
      API.GETLOCATIONDATA,
      action.payload
    );
    //console.log(response);
    if (response?.status == 200) {
      yield put(getLocationRecDataSuccess({ locationData: response?.data }));
    } else {
      yield put(getLocationRecDataError(response?.data?.message));
    }
  } catch (e) {
    yield put(getLocationRecDataError(e.message));
  }
}

export function* getLocationRecData() {
  yield takeLatest(actions.GET_LOCATIONRECDATA_REQUEST, getLocationRecDataSaga);
}
