import * as actionTypes from "../actions/types";

import { updateObject } from "../utility";

const initialState = {
  user: {},
  loggedIn: false,
  loginForm: false,
};

const toggleLogin = (state, payload) => {
  return updateObject(state, {
    loginForm: payload,
  });
};

const authSuccess = (state, payload) => {
  return updateObject(state, {
    user: payload,
    loggedIn: true,
  });
};

const authReducer = (state = initialState, action) => {
  switch (action?.type) {
    case actionTypes.TOGGLE_LOGIN:
      return toggleLogin(state, action?.payload);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action?.payload);
    case actionTypes.RESET_AUTH_STATE:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
