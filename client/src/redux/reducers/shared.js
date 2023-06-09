import * as actionTypes from "../actions/types";
import { updateObject } from "../utility";

const initialState = {
  loading: false,
};

const toggleLoading = (state, payload) => {
  return updateObject(state, {
    loading: payload,
  });
};

const sharedReducer = (state = initialState, action) => {
  switch (action?.type) {
    case actionTypes.TOGGLE_LOADING:
      return toggleLoading(state, action?.payload);
    case actionTypes.RESET_SHARED_STATE:
      return initialState;
    default:
      return state;
  }
};

export default sharedReducer;
