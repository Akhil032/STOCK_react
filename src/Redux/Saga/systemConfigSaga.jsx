import { call, put, takeLatest } from "redux-saga/effects";
import {
  getSystemConfigListSuccess,
  getSystemConfigError,
  postSystemConfigSucess,
  postSystemConfigError,
} from "../Action/systemConfig";
import * as actions from "../constant";
import axiosCall from "../../services/index";
import { API } from "../../services/api";

function* fetchDataSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.FETCHCONFIGDATA,action.payload);
    console.log(response);
    if (response?.data?.status == 500) {
      yield put(getSystemConfigError({Data: response?.data}));
    } else {
      console.log(response?.data);
      yield put(getSystemConfigListSuccess({ Data: response?.data }));
    }
  } catch (e) {
    yield put(getSystemConfigError(e.message));
  }
}

export function* SystemConfig() {
  yield takeLatest(actions.GET_SYSTEMCONFIG_REQUEST, fetchDataSaga);
}


function* updateDataSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.UPDATECONFIGDATA,action.payload);
    if (response?.status == 200) {
      yield put(postSystemConfigSucess({ Data: response?.data }));
    } else {
      yield put(postSystemConfigError(response?.data?.message));
    }
  } catch (e) {
    yield put(postSystemConfigError(e.message));
  }
}

export function* updateSystemConfig() {
  yield takeLatest(actions.POST_SYSTEMCONFIG_REQUEST, updateDataSaga);
}

