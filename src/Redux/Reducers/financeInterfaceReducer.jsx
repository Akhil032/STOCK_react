import * as actions from "../constant";
const initialState = {
  isLoading: false,
  data: [],
  isError: false,
  message: "",
  isSuccess: false,
};

const FinanceInterfaceReducers = (state = initialState, action) => {

  switch (action.type) {
    case actions.GET_FINANCEINTERFACE_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: "",
        isSuccess: false,
      };

    case actions.GET_FINANCEINTERFACE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        isError: false,
       message: action.payload?.Data?.message,
       isSuccess: false,
      };

    case actions.GET_FINANCEINTERFACE_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload?.Data?.message,
        isSuccess: false,
      };
   
      default:
        return { ...state };
    }
  };

    

export default FinanceInterfaceReducers;
