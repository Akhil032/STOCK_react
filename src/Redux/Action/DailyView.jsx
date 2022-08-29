import { createAction } from "redux-actions";
import * as actions from "../constant";

export const getDailyViewRequest = createAction(
  actions.GET_DAILYVIEW_REQUEST
);
export const getDailyViewListSuccess = createAction(
  actions.GET_DAILYVIEW_SUCCESS
);
export const getDailyViewError = createAction(
  actions.GET_DAILYVIEW_ERROR
);