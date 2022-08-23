import { call, put, takeLatest } from "redux-saga/effects";
import {
  getTransactionReversalListSuccess,
  getTransactionReversalError,
  postTransactionReversalSucess,
  postTransactionReversalError,
  getClassDataSuccess,
  getClassDataError,
  getLocationDataSuccess,
  getLocationDataError,
  postTransactionCancelSuccess,
  postTransactionCancelError,
} from "../Action/transactionReversal";
import * as actions from "../constant";
import axiosCall from "../../services/index";
import { API } from "../../services/api";

function* fetchDataSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.FETCHTRANSACTIONREVERSAL,action.payload);
    if (response?.data?.status === 500) {
      yield put(getTransactionReversalError({Data: response?.data}));
    } else {
      yield put(getTransactionReversalListSuccess({ Data: response?.data }));
    }
  } catch (e) {
    yield put(getTransactionReversalError(e.message));
  }
}

export function* TransactionReversal() {
  yield takeLatest(actions.GET_TRANSACTIONREVERSAL_REQUEST, fetchDataSaga);
}


function* cancelDataSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.CANCELTRANSACTIONREVERSAL,action.payload);
    if (response?.status === 200) {
      yield put(postTransactionCancelSuccess({ Data: response?.data }));
    } else {
      yield put(postTransactionCancelError(response?.data?.message));
    }
  } catch (e) {
    yield put(postTransactionCancelError(e.message));
  }
}

export function* cancelTransactionReversal() {
  yield takeLatest(actions.POST_TRANSACTIONCANCEL_REQUEST, cancelDataSaga);
}

function* updateDataSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.UPDATETRANSACTIONREVERSAL,action.payload);
    if (response?.status === 200) {
      yield put(postTransactionReversalSucess({ Data: response?.data }));
    } else {
      yield put(postTransactionReversalError(response?.data?.message));
    }
  } catch (e) {
    yield put(postTransactionReversalError(e.message));
  }
}

export function* updateTransactionReversal() {
  yield takeLatest(actions.POST_TRANSACTIONREVERSAL_REQUEST, updateDataSaga);
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

function* getLocationDataSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.GETLOCATIONDATA,action.payload);
    //console.log(response);
    if (response?.status === 200) {
      yield put(getLocationDataSuccess({ locationData: response?.data }));
    } else {
      yield put(getLocationDataError(response?.data?.message));
    }
  } catch (e) {
    yield put(getLocationDataError(e.message));
  }
}

export function* getLocationDataTrans() {
  yield takeLatest(actions.GET_LOCATIONDATA_REQUEST, getLocationDataSaga);
}
