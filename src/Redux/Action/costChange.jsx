import { createAction } from "redux-actions";
import * as actions from "../constant";

export const getCostChangeRequest = createAction(
  actions.GET_COSTCHANGE_REQUEST
);
export const getCostChangeListSuccess = createAction(
  actions.GET_COSTCHANGE_SUCCESS
);
export const getCostChangeError = createAction(
  actions.GET_COSTCHANGE_ERROR
);
export const postCostChangeRequest = createAction(
      actions.POST_COSTCHANGE_REQUEST
);
export const postCostChangeSucess = createAction(
      actions.POST_COSTCHANGE_SUCCESS
);
export const postCostChangeError = createAction(
      actions.POST_COSTCHANGE_ERROR
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
