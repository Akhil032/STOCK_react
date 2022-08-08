import { createAction } from "redux-actions";
import * as actions from "../constant";

export const getStageProcessingRequest = createAction(
  actions.GET_STAGEPROCEESING_REQUEST
);
export const getStageProcessingListSuccess = createAction(
  actions.GET_STAGEPROCEESING_SUCCESS
);
export const getStageProcessingError = createAction(
  actions.GET_STAGEPROCEESING_ERROR
);

export const resetStageProcessing=createAction(
  actions.RESET_STAGEPROCESSING
)