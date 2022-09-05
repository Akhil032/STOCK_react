import * as actions from "../constant";
const initialState = {
  isLoading: false,
  data: [],
  isError: false,
  messgae: "",
  isSuccess: false,
};

const ErrorProcessingReducers = (state = initialState, action) => {

  switch (action.type) {
    case actions.GET_ERRORPROCESSING_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        messgae: "",
        isSuccess: false,
      };

    case actions.GET_ERRORPROCESSING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        isError: false,
        messgae: action.payload?.Data?.message,
        isSuccess: false,
      };

    case actions.GET_ERRORPROCESSING_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        messgae: action.payload?.Data?.message,
        isSuccess: false,
      };
      case actions.POST_ERRORPROCESSING_REQUEST:
        return {
          ...state,
          isLoading: true,
          isError: false,
          messgae: "",
          isSuccess: false,
        };
  
      case actions.POST_ERRORPROCESSING_SUCCESS:
        return {
          ...state,
          isLoading: false,
          data: action.payload,
          isError: false,
          messgae: action.payload?.Data?.message,
          isSuccess: true,
        };
      case actions.POST_ERRORPROCESSING_ERROR:
        return {
          ...state,
          isLoading: false,
          isError: true,
          messgae: action.payload?.Data?.message,
          isSuccess: false,
        };
        case actions.GET_HIER2DATA_REQUEST:
        return {
          ...state,
          isLoading: true,
          isError: false,
          messgae: "",
          isSuccess: false,
        };
  
      case actions.GET_HIER2DATA_SUCCESS:
        return {
          ...state,
          isLoading: false,
          data: action.payload,
          isError: false,
          messgae: action.payload?.Data?.message,
          isSuccess: false,
        };
      case actions.GET_HIER2DATA_ERROR:
        return {
          ...state,
          isLoading: false,
          isError: true,
          messgae: action.payload?.Data?.message,
          isSuccess: false,
        };
        case actions.GET_LOCATIONDATA_REQUEST:
        return {
          ...state,
          isLoading: true,
          isError: false,
          messgae: "",
          isSuccess: false,
        };
  
      case actions.GET_LOCATIONDATA_SUCCESS:
        return {
          ...state,
          isLoading: false,
          data: action.payload,
          isError: false,
          messgae: action.payload?.Data?.message,
          isSuccess: false,
        };
      case actions.GET_LOCATIONDATA_ERROR:
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

export default ErrorProcessingReducers;
