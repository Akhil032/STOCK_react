import * as actions from "../constant";
const initialState = {
  isLoading: false,
  data: [],
  isError: false,
  messgae: "",
  isSuccess: false,
};

const InquiryReducers = (state = initialState, action) => {

  switch (action.type) {
    case actions.GET_INQUIRYDATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        messgae: "",
        isSuccess: false,
      };

    case actions.GET_INQUIRYDATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        isError: false,
        messgae: action.payload?.Data?.message,
        isSuccess: false,
      };

    case actions.GET_INQUIRYDATA_ERROR:
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
    case actions.RESET_INQUIRY:
      return {
        isLoading: false,
        data: [],
        isError: false,
        messgae: '',
        isSuccess: false,
      };
    default:
      return { ...state };
  }
};

export default InquiryReducers;
