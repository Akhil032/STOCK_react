import * as actions from "../constant";
const initialState = {
  isLoading: false,
  data: [],
  isError: false,
  messgae: "",
  isSuccess: false,
};

const DashboardReducers = (state = initialState, action) => {

  switch (action.type) {
    case actions.GET_DAILYCOUNT_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        messgae: "",
        isSuccess: false,
      };

    case actions.GET_DAILYCOUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        isError: false,
        messgae: action.payload?.Data?.message,
        isSuccess: true,
      };

    case actions.GET_DAILYCOUNT_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        messgae: action.payload?.Data?.message,
        isSuccess: false,
      };
      case actions.GET_STAGECOUNT_REQUEST:
        return {
          ...state,
          isLoading: true,
          isError: false,
          messgae: "",
          isSuccess: false,
        };
  
      case actions.GET_STAGECOUNT_SUCCESS:
        return {
          ...state,
          isLoading: false,
          data: action.payload,
          isError: false,
          messgae: action.payload?.Data?.message,
          isSuccess: true,
        };
      case actions.GET_STAGECOUNT_ERROR:
        return {
          ...state,
          isLoading: false,
          isError: true,
          messgae: action.payload?.Data?.message,
          isSuccess: false,
        };
        case actions.GET_ERRORCOUNT_REQUEST:
          return {
            ...state,
            isLoading: true,
            isError: false,
            messgae: "",
            isSuccess: false,
          };
    
        case actions.GET_ERRORCOUNT_SUCCESS:
          return {
            ...state,
            isLoading: false,
            data: action.payload,
            isError: false,
            messgae: action.payload?.Data?.message,
            isSuccess: true,
          };
        case actions.GET_ERRORCOUNT_ERROR:
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

export default DashboardReducers;
