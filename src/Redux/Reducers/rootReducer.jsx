import { combineReducers } from "redux";

import StagingProcessingReducers from "./stagingProcessingReducers";
import ErrorProcessingReducers from "./errorProcessingReducers";
import CostChangeReducers from "./CostChangeReducers";

const rootReducer = combineReducers({
  StagingProcessingReducers,
    ErrorProcessingReducers,
    CostChangeReducers
});

export default rootReducer;
