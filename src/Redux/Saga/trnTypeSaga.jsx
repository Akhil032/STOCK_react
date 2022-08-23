import { call, put, takeLatest } from "redux-saga/effects";
import {
  getTrnTypeDataSuccess,
  getTrnTypeDataError,
} from "../Action/trnType";
import * as actions from "../constant";
import axiosCall from "../../services/index";
import { API } from "../../services/api";

function* getTrnTypeDataSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.FETCHTRNTYPE,action.payload);
    //console.log(response);
    if (response?.status == 200) {
      yield put(getTrnTypeDataSuccess({ trnTypeData: response?.data }));
    } else {
      yield put(getTrnTypeDataError(response?.data?.message));
    }
  } catch (e) {
    yield put(getTrnTypeDataError(e.message));
  }
}

export function* TrnTypeData() {
  yield takeLatest(actions.GET_TRNTYPE_REQUEST, getTrnTypeDataSaga);
}


