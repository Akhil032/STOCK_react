import { all, fork } from "redux-saga/effects";
import StagingProcessing from "./stagingProcessingSaga";
import {ErrorProcessing,updateErrorProcessing,getClassData, getLocationData} from "./errorProcessingSaga";
import { CostChange, updateCostChange } from "./CostChangeSaga"; //,getClassData, getLocationData

export function* rootSaga() {
  yield all([
    fork(StagingProcessing),
    fork(ErrorProcessing),
    fork(updateErrorProcessing),
    fork(getClassData),
      fork(getLocationData),
      fork(CostChange),
      fork(updateCostChange)
  ]);
}
