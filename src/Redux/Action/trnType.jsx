import { createAction } from "redux-actions";
import * as actions from "../constant";

export const getTrnTypeDataRequest = createAction(
  actions.GET_TRNTYPE_REQUEST
);
export const getTrnTypeDataSuccess = createAction(
actions.GET_TRNTYPE_SUCCESS
);
export const getTrnTypeDataError = createAction(
actions.GET_TRNTYPE_ERROR
);
