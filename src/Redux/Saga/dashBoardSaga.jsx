import { call, put, takeLatest } from "redux-saga/effects";
import {
  getDailyCountSuccess,
  getDailyCountError,
  getStageCountSuccess,
  getStageCountError,
  getErrorCountSuccess,
  getErrorCountError
} from "../Action/dashBoard";
import * as actions from "../constant";
import axiosCall from "../../services/index";
import { API } from "../../services/api";

function* fetchDailyCountSaga(action) {
  try {
    const response = yield call(axiosCall, "GET", API.DAILYCOUNTDATA);
    if (response?.status == 200) {
      yield put(getDailyCountSuccess({ DailyCount: response?.data }));
    } else {
      yield put(getDailyCountError(response?.data?.message));
    }
  } catch (e) {

    yield put(getDailyCountError(e.message));
  }
}

export function* DailyCountData() {
  yield takeLatest(actions.GET_DAILYCOUNT_REQUEST, fetchDailyCountSaga);
}

function* fetchStageCountSaga(action) {
  try {
    const response = yield call(axiosCall, "GET", API.STAGECOUNTDATA);
    if (response?.status == 200) {
      yield put(getStageCountSuccess({ StageCount: response?.data }));
    } else {
      yield put(getStageCountError(response?.data?.message));
    }
  } catch (e) {

    yield put(getStageCountError(e.message));
  }
}

export function* StageCountData() {
  yield takeLatest(actions.GET_STAGECOUNT_REQUEST, fetchStageCountSaga);
}

function* fetchErrorCountSaga(action) {
  try {
    const response = yield call(axiosCall, "GET", API.ERRORCOUNTDATA);
    if (response?.status == 200) {
      yield put(getErrorCountSuccess({ TranCount: response?.data }));
    } else {
      yield put(getErrorCountError(response?.data?.message));
    }
  } catch (e) {

    yield put(getErrorCountError(e.message));
  }
}

export function* ErrorCountData() {
  yield takeLatest(actions.GET_ERRORCOUNT_REQUEST, fetchErrorCountSaga);
}
