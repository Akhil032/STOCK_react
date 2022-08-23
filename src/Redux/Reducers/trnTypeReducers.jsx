import * as actions from "../constant";
const initialState = {
  isLoading: false,
  data: [],
  isError: false,
  messgae: "",
  isSuccess: false,
};

const TrnTypeReducers = (state = initialState, action) => {

  switch (action.type) {
  case actions.GET_TRNTYPE_REQUEST:
    return {
      ...state,
      isLoading: true,
      isError: false,
      messgae: "",
      isSuccess: false,
    };

  case actions.GET_TRNTYPE_SUCCESS:
    return {
      ...state,
      isLoading: false,
      data: action.payload,
      isError: false,
      messgae: action.payload?.Data?.message,
      isSuccess: false,
    };
  case actions.GET_TRNTYPE_ERROR:
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

export default TrnTypeReducers;
