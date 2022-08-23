import { createAction } from "redux-actions";
import * as actions from "../constant";

// export const getGlAccountRequest = createAction(
//   actions.GET_GLACCOUNT_REQUEST
// );
// export const getGlAccountListSuccess = createAction(
//   actions.GET_GLACCOUNT_SUCCESS
// );
// export const getGlAccountError = createAction(
//   actions.GET_GLACCOUNT_ERROR
// );
export const getGlcurrencyRequest = createAction(
  actions.GET_GLCURRENCY_REQUEST
);
export const getGlcurrencySuccess = createAction(
  actions.GET_GLCURRENCY_SUCCESS
);
export const getGlcurrencyError = createAction(
  actions.GET_GLCURRENCY_ERROR
);
export const postGlcreationRequest = createAction(
      actions.POST_GLCREATION_REQUEST
);
export const postGlcreationSuccess = createAction(
      actions.POST_GLCREATION_SUCCESS
);
export const postGlcreationError = createAction(
      actions.POST_GLCREATION_ERROR
);


