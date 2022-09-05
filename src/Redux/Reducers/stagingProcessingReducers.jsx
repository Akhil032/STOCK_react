import * as actions from "../constant";
const initialState = {
  isLoading: false,
  data: [],
  isError: false,
  messgae: "",
  isSuccess: false,
};

const StagingProcessingReducers = (state = initialState, action) => {

  switch (action.type) {
    case actions.GET_STAGEPROCEESING_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        messgae: "",
        isSuccess: false,
      };

    case actions.GET_STAGEPROCEESING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        isError: false,
        messgae: action.payload?.Data?.message,
        isSuccess: false,
      };
    case actions.RESET_STAGEPROCESSING:
      return {
        ...state,
        isLoading: false,
        isError: false,
        messgae: '',
        isSuccess: false,
      };

    case actions.GET_STAGEPROCEESING_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        messgae: action.payload,
        isSuccess: false,
      };

    default:
      return { ...state };
  }
};

export default StagingProcessingReducers;
