import { createAction } from "redux-actions";
import * as actions from "../constant";

export const getErrorProcessingRequest = createAction(
  actions.GET_ERRORPROCESSING_REQUEST
);
export const getErrorProcessingListSuccess = createAction(
  actions.GET_ERRORPROCESSING_SUCCESS
);
export const getErrorProcessingError = createAction(
  actions.GET_ERRORPROCESSING_ERROR
);
export const postErrorProcessingRequest = createAction(
      actions.POST_ERRORPROCESSING_REQUEST
);
export const postErrorProcessingSucess = createAction(
      actions.POST_ERRORPROCESSING_SUCCESS
);
export const postErrorProcessingError = createAction(
      actions.POST_ERRORPROCESSING_ERROR
);
export const getClassDataRequest = createAction(
    actions.GET_HIER2DATA_REQUEST
);
export const getClassDataSuccess = createAction(
  actions.GET_HIER2DATA_SUCCESS
);
export const getClassDataError = createAction(
  actions.GET_HIER2DATA_ERROR
);
export const getLocationDataRequest = createAction(
  actions.GET_LOCATIONDATA_REQUEST
);
export const getLocationDataSuccess = createAction(
actions.GET_LOCATIONDATA_SUCCESS
);
export const getLocationDataError = createAction(
actions.GET_LOCATIONDATA_ERROR
);
