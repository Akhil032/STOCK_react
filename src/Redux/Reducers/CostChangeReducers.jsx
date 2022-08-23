import * as actions from "../constant";
const initialState = {
  isLoading: false,
  data: [],
  isError: false,
  message: "",
  isSuccess: false,
};

const CostChangeReducers = (state = initialState, action) => {

  switch (action.type) {
    case actions.GET_COSTCHANGE_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: "",
        isSuccess: false,
      };

    case actions.GET_COSTCHANGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        isError: false,
       message: action.payload?.Data?.message,
       isSuccess: false,
      };

    case actions.GET_COSTCHANGE_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload?.Data?.message,
        isSuccess: false,
      };
      case actions.POST_COSTCHANGE_REQUEST:
        return {
          ...state,
          isLoading: true,
          isError: false,
          message: "",
          isSuccess: false,
        };
  
      case actions.POST_COSTCHANGE_SUCCESS:
        return {
          ...state,
          isLoading: false,
          data: action.payload,
          isError: false,
          message: action.payload?.Data?.message,
          isSuccess: true,
        };
      case actions.POST_COSTCHANGE_ERROR:
        return {
          ...state,
          isLoading: false,
          isError: true,
          message: action.payload?.Data?.message,
          isSuccess: false,
        };
        case actions.GET_HIER2DATA_REQUEST:
        return {
          ...state,
          isLoading: true,
          isError: false,
          message: "",
          isSuccess: false,
        };
  
      case actions.GET_HIER2DATA_SUCCESS:
        return {
          ...state,
          isLoading: false,
          data: action.payload,
          isError: false,
          message: action.payload?.Data?.message,
          isSuccess: false,
        };
      case actions.GET_HIER2DATA_ERROR:
        return {
          ...state,
          isLoading: false,
          isError: true,
          message: action.payload?.Data?.message,
          isSuccess: false,
        };
        case actions.GET_LOCATIONDATA_REQUEST:
          return {
            ...state,
            isLoading: true,
            isError: false,
            message: "",
            isSuccess: false,
          };
    
        case actions.GET_LOCATIONDATA_SUCCESS:
          return {
            ...state,
            isLoading: false,
            data: action.payload,
            isError: false,
            message: action.payload?.Data?.message,
            isSuccess: false,
          };
        case actions.GET_LOCATIONDATA_ERROR:
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

    

export default CostChangeReducers;
