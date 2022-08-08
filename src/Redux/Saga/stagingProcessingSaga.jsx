import { call, put, takeLatest } from "redux-saga/effects";
import {
  getStageProcessingListSuccess,
  getStageProcessingError,
} from "../Action/staginProcessing";
import * as actions from "../constant";
import axiosCall from "../../services/index";
import { API } from "../../services/api";

function* fetchDataSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.EXCELDATA,action.payload);
    if (response?.data.status == 201) {
      yield put(getStageProcessingListSuccess({ Data: response?.data }));
    } else {
      yield put(getStageProcessingError(response?.data?.message));
    }
  } catch (e) {

    yield put(getStageProcessingError(e.message));
  }
}

function* StagingProcessing() {
  yield takeLatest(actions.GET_STAGEPROCEESING_REQUEST, fetchDataSaga);
}

export default StagingProcessing;
