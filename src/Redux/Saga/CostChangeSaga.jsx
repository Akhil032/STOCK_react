import { call, put, takeLatest } from "redux-saga/effects";
import {
  getCostChangeListSuccess,
  getCostChangeError,
  postCostChangeSucess,
  postCostChangeError,
  getClassDataSuccess,
  getClassDataError,
  getLocationDataSuccess,
  getLocationDataError,
} from "../Action/costChange";
import * as actions from "../constant";
import axiosCall from "../../services/index";
import { API } from "../../services/api";

function* fetchDataSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.FETCHITEMLOCATIONDATA,action.payload);
    if (response?.data?.status == 500) {
      yield put(getCostChangeError({Data: response?.data}));
    } else {
      yield put(getCostChangeListSuccess({ Data: response?.data }));
    }
  } catch (e) {
    yield put(getCostChangeError(e.message));
  }
}

export function* CostChange() {
  yield takeLatest(actions.GET_COSTCHANGE_REQUEST, fetchDataSaga);
}


function* updateDataSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.UPDATECOSTANDVAR,action.payload);
    if (response?.status == 200) {
      yield put(postCostChangeSucess({ Data: response?.data }));
    } else {
      yield put(postCostChangeError(response?.data?.message));
    }
  } catch (e) {
    yield put(postCostChangeError(e.message));
  }
}

export function* updateCostChange() {
  yield takeLatest(actions.POST_COSTCHANGE_REQUEST, updateDataSaga);
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
