import { combineReducers } from "redux";

import StagingProcessingReducers from "./stagingProcessingReducers";
import ErrorProcessingReducers from "./errorProcessingReducers";
import CostChangeReducers from "./CostChangeReducers";
import FinanceInterfaceReducers from "./financeInterfaceReducer";
const rootReducer = combineReducers({
  StagingProcessingReducers,
    ErrorProcessingReducers,
    CostChangeReducers,
    FinanceInterfaceReducers

});

export default rootReducer;
