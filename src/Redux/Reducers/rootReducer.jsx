import { combineReducers } from "redux";
import CostChangeReducers from "./CostChangeReducers";
import StagingProcessingReducers from "./stagingProcessingReducers";
import ErrorProcessingReducers from "./errorProcessingReducers";
import SystemConfigReducers from "./systemConfigReducers";
import DashboardReducers from "./dashBoardReducers";
import ReconciliationReducers from "./reconciliationReducers";
import InquiryReducers from "./inquiryReducers";
import TransactionReversalReducers from "./transactionReversalReducers";
import glaccountReducers from "./glaccountReducers";
import glcreationReducers from "./glcreationReducers";
import FinanceInterfaceReducers from "./financeInterfaceReducer";
import DailyViewReducers from "./DailyViewReducers";

const rootReducer = combineReducers({
  StagingProcessingReducers,
  ErrorProcessingReducers,
  SystemConfigReducers,
  DashboardReducers,
  ReconciliationReducers,
  InquiryReducers,
  TransactionReversalReducers,
  CostChangeReducers,
  glaccountReducers,
  glcreationReducers,
  FinanceInterfaceReducers,
  DailyViewReducers,
});

export default rootReducer;
