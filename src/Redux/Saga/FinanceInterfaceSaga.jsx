import { call, put, takeLatest } from "redux-saga/effects";
import {
  getFinanceInterfaceListSuccess,
  getFinanceInterfaceError,
  
} from "../Action/financeInterface";
import * as actions from "../constant";
import axiosCall from "../../services/index";
import { API } from "../../services/api";

function* fetchDataSaga(action) {
  try {
    const response = yield call(axiosCall, "GET", API.FETCHSTGFIN,action.payload);
    if (response?.data?.status == 500) {
      yield put(getFinanceInterfaceError({Data: response?.data}));
    } else {
      yield put(getFinanceInterfaceListSuccess({ Data: response?.data }));
    }
  } catch (e) {
    yield put(getFinanceInterfaceError(e.message));
  }
}

export function* FinanceInterface() {
  yield takeLatest(actions.GET_FINANCEINTERFACE_REQUEST, fetchDataSaga);
}


// function* updateDataSaga(action) {
//   try {
//     const response = yield call(axiosCall, "POST", API.UPDATECOSTANDVAR,action.payload);
//     if (response?.status == 200) {
//       yield put(postCostChangeSucess({ Data: response?.data }));
//     } else {
//       yield put(postCostChangeError(response?.data?.message));
//     }
//   } catch (e) {
//     yield put(postCostChangeError(e.message));
//   }
// }

// export function* updateCostChange() {
//   yield takeLatest(actions.POST_COSTCHANGE_REQUEST, updateDataSaga);
// }

// function* getClassDataSaga(action) {
//   try {
//     const response = yield call(axiosCall, "POST", API.GETHIER2DATA,action.payload);
//     //console.log(response);
//     if (response?.status == 200) {
//       yield put(getClassDataSuccess({ itemData: response?.data }));
//     } else {
//       yield put(getClassDataError(response?.data?.message));
//     }
//   } catch (e) {
//     yield put(getClassDataError(e.message));
//   }
// }

// export function* getClassData() {
//   yield takeLatest(actions.GET_HIER2DATA_REQUEST, getClassDataSaga);
// }

// function* getLocationDataSaga(action) {
//   try {
//     const response = yield call(axiosCall, "POST", API.GETLOCATIONDATA,action.payload);
//     //console.log(response);
//     if (response?.status == 200) {
//       yield put(getLocationDataSuccess({ locationData: response?.data }));
//     } else {
//       yield put(getLocationDataError(response?.data?.message));
//     }
//   } catch (e) {
//     yield put(getLocationDataError(e.message));
//   }
// }

// export function* getLocationData() {
//   yield takeLatest(actions.GET_LOCATIONDATA_REQUEST, getLocationDataSaga);
// }
