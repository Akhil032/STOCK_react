import { createAction } from "redux-actions";
import * as actions from "../constant";

export const getSystemConfigRequest = createAction(
  actions.GET_SYSTEMCONFIG_REQUEST
);
export const getSystemConfigListSuccess = createAction(
  actions.GET_SYSTEMCONFIG_SUCCESS
);
export const getSystemConfigError = createAction(
  actions.GET_SYSTEMCONFIG_ERROR
);
export const postSystemConfigRequest = createAction(
      actions.POST_SYSTEMCONFIG_REQUEST
);
export const postSystemConfigSucess = createAction(
      actions.POST_SYSTEMCONFIG_SUCCESS
);
export const postSystemConfigError = createAction(
      actions.POST_SYSTEMCONFIG_ERROR
);
export const resetSystemConfig = createAction(
  actions.RESET_SYSTEMCONFIG
)
