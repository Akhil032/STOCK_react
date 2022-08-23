import { createAction } from "redux-actions";
import * as actions from "../constant";

export const getDailySkuRollupDataRequest = createAction(
  actions.GET_DAILY_SKU_ROLLUPDATA_REQUEST
);
export const getDailySkuRollupDataSuccess = createAction(
  actions.GET_DAILY_SKU_ROLLUPDATA_SUCCESS
);
export const getDailySkuRollupDataError = createAction(
  actions.GET_DAILY_SKU_ROLLUPDATA_ERROR
);
export const getDeptRecDataRequest = createAction(
  actions.GET_HIER1RECDATA_REQUEST
);
export const getDeptRecDataSuccess = createAction(
  actions.GET_HIER1RECDATA_SUCCESS
);
export const getDeptRecDataError = createAction(actions.GET_HIER1RECDATA_ERROR);
export const getLocationRecDataRequest = createAction(
  actions.GET_LOCATIONRECDATA_REQUEST
);
export const getLocationRecDataSuccess = createAction(
  actions.GET_LOCATIONRECDATA_SUCCESS
);
export const getLocationRecDataError = createAction(
  actions.GET_LOCATIONRECDATA_ERROR
);
