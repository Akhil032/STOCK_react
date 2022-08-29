import * as actions from "../constant";
const initialState = {
  isLoading: false,
  data: [],
  isError: false,
  message: "",
  isSuccess: false,
};

const DailyViewReducers = (state = initialState, action) => {

  switch (action.type) {
    case actions.GET_DAILYVIEW_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: "",
        isSuccess: false,
      };

    case actions.GET_DAILYVIEW_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        isError: false,
       message: action.payload?.Data?.message,
       isSuccess: false,
      };

    case actions.GET_DAILYVIEW_ERROR:
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

    

export default DailyViewReducers;
