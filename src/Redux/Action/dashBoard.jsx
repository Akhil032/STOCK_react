import { createAction } from "redux-actions";
import * as actions from "../constant";

export const getDailyCountRequest = createAction(
  actions.GET_DAILYCOUNT_REQUEST
);
export const getDailyCountSuccess = createAction(
  actions.GET_DAILYCOUNT_SUCCESS
);
export const getDailyCountError = createAction(
  actions.GET_DAILYCOUNT_ERROR
);
export const getStageCountRequest = createAction(
  actions.GET_STAGECOUNT_REQUEST
);
export const getStageCountSuccess = createAction(
  actions.GET_STAGECOUNT_SUCCESS
);
export const getStageCountError = createAction(
  actions.GET_STAGECOUNT_ERROR
);
export const getErrorCountRequest = createAction(
  actions.GET_ERRORCOUNT_REQUEST
);
export const getErrorCountSuccess = createAction(
  actions.GET_ERRORCOUNT_SUCCESS
);
export const getErrorCountError = createAction(
  actions.GET_ERRORCOUNT_ERROR
);
