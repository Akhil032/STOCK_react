import { call, put, takeLatest } from "redux-saga/effects";
import {
  getDailyViewListSuccess,
  getDailyViewError,
  
} from "../Action/DailyView";
import * as actions from "../constant";
import axiosCall from "../../services/index";
import { API } from "../../services/api";

function* fetchDataSaga(action) {
  try {
    const response = yield call(axiosCall, "GET", API.FETCHDAILYVIEW,action.payload);
    if (response?.data?.status == 500) {
      yield put(getDailyViewError({Data: response?.data}));
    } else {
      yield put(getDailyViewListSuccess({ Data: response?.data }));
    }
  } catch (e) {
    yield put(getDailyViewError(e.message));
  }
}

export function* DailyView() {
  yield takeLatest(actions.GET_DAILYVIEW_REQUEST, fetchDataSaga);
}
