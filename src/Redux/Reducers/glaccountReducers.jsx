import * as actions from "../constant";
const initialState = {
  isLoading: false,
  data: [],
  isError: false,
  message: "",
  isSuccess: false,
};

const glaccountReducers = (state = initialState, action) => {

  switch (action.type) {
    case actions.GET_GLACCOUNT_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: "",
        isSuccess: false,
      };

    case actions.GET_GLACCOUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        isError: false,
        message: action.payload?.Data?.message,
        isSuccess: false,
      };

    case actions.GET_GLACCOUNT_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload?.Data?.message,
        isSuccess: false,
      };
      case actions.GET_GLCURRENCY_REQUEST:
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: action.payload?.Data?.message,
        isSuccess: false,
      };
      case actions.GET_GLCURRENCY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        isError: false,
        message: action.payload?.Data?.message,
        isSuccess: false,
      };

    case actions.GET_GLCURRENCY_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload?.Data?.message,
        isSuccess: false,
      };
      
    case actions.POST_GLACCOUNT_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: "",
        isSuccess: false,
      };
    
    case actions.POST_GLACCOUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        isError: false,
        message: action.payload?.Data?.message,
        isSuccess: true,
      };
    case actions.POST_GLACCOUNT_ERROR:
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

export default glaccountReducers;
