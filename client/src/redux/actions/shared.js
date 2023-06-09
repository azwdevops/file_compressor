import { TOGGLE_LOADING } from "./types";

export const showError = (err) => {
  if (err.response?.status === 400) {
    // we confirm if error is available, if so show it
    if (err?.response?.data?.detail) {
      window.alert(err?.response?.data?.detail);
    } else {
      // here we assume if error is not available in if above, we assume it's a serializer error and then show it as below
      // this may change if more information comes up on how to handle this
      window.alert(Object.values(err.response?.data)[0][0]);
    }
  } else if (err?.response?.status === 401) {
    if (
      err?.response?.data?.detail === "Given token not valid for any token type"
    ) {
      // we reload window to ensure user is logged out
      window.reload();
    } else {
      window.alert(err?.response?.data?.detail);
    }
  } else {
    window.alert(
      "Error, unable to process your request currently, try again later."
    );
  }
};

export const stopLoading = (dispatch) => {
  dispatch({ type: TOGGLE_LOADING, payload: false });
};
