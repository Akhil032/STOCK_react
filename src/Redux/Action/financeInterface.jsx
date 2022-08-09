import { createAction } from "redux-actions";
import * as actions from "../constant";

export const getFinanceInterfaceRequest = createAction(
  actions.GET_FINANCEINTERFACE_REQUEST
);
export const getFinanceInterfaceListSuccess = createAction(
  actions.GET_FINANCEINTERFACE_SUCCESS
);
export const getFinanceInterfaceError = createAction(
  actions.GET_FINANCEINTERFACE_ERROR
);