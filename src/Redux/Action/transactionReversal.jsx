import { createAction } from "redux-actions";
import * as actions from "../constant";

export const getTransactionReversalRequest = createAction(
  actions.GET_TRANSACTIONREVERSAL_REQUEST
);
export const getTransactionReversalListSuccess = createAction(
  actions.GET_TRANSACTIONREVERSAL_SUCCESS
);
export const getTransactionReversalError = createAction(
  actions.GET_TRANSACTIONREVERSAL_ERROR
);
export const postTransactionReversalRequest = createAction(
      actions.POST_TRANSACTIONREVERSAL_REQUEST
);
export const postTransactionReversalSucess = createAction(
      actions.POST_TRANSACTIONREVERSAL_SUCCESS
);
export const postTransactionReversalError = createAction(
      actions.POST_TRANSACTIONREVERSAL_ERROR
);
export const postTransactionCancelRequest = createAction(
  actions.POST_TRANSACTIONCANCEL_REQUEST
);
export const postTransactionCancelSuccess = createAction(
  actions.POST_TRANSACTIONCANCEL_SUCCESS
);
export const postTransactionCancelError = createAction(
  actions.POST_TRANSACTIONCANCEL_ERROR
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
export const resetTransactionReversal = createAction(
  actions.RESET_TRANSACTIONREVERSAL
)
