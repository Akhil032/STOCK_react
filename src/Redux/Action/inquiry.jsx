import { createAction } from "redux-actions";
import * as actions from "../constant";

export const getInquiryDataRequest = createAction(
  actions.GET_INQUIRYDATA_REQUEST
);
export const getInquiryDataSuccess = createAction(
  actions.GET_INQUIRYDATA_SUCCESS
);
export const getInquiryDataError = createAction(
  actions.GET_INQUIRYDATA_ERROR
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
export const resetInquiry = createAction(
  actions.RESET_INQUIRY
)