import * as actions from "../constant";
const initialState = {
  isLoading: false,
  data: [],
  isError: false,
  messgae: "",
  isSuccess: false,
};

const ReconciliationReducers = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_DAILY_SKU_ROLLUPDATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        messgae: "",
        isSuccess: false,
      };

    case actions.GET_DAILY_SKU_ROLLUPDATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        isError: false,
        messgae: action.payload?.Data?.message,
        isSuccess: false,
      };

    case actions.GET_DAILY_SKU_ROLLUPDATA_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        messgae: action.payload?.Data?.message,
        isSuccess: false,
      };
    case actions.GET_HIER1RECDATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        messgae: "",
        isSuccess: false,
      };

    case actions.GET_HIER1RECDATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        isError: false,
        messgae: action.payload?.Data?.message,
        isSuccess: false,
      };
    case actions.GET_HIER1RECDATA_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        messgae: action.payload?.Data?.message,
        isSuccess: false,
      };
    case actions.GET_LOCATIONRECDATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        messgae: "",
        isSuccess: false,
      };

    case actions.GET_LOCATIONRECDATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        isError: false,
        messgae: action.payload?.Data?.message,
        isSuccess: false,
      };
    case actions.GET_LOCATIONRECDATA_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        messgae: action.payload?.Data?.message,
        isSuccess: false,
      };

    default:
      return { ...state };
  }
};

export default ReconciliationReducers;
