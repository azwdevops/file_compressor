import * as api from "../../api";
import { stopLoading } from "./shared";
import * as actionTypes from "./types";

export const get_user_data = (navigate) => async (dispatch) => {
  await api
    .getUserData()
    .then((res) => {
      dispatch({
        type: actionTypes.AUTH_SUCCESS,
        payload: res?.data?.user_data,
      });
    })
    .catch((err) => {
      // showError(err)
      dispatch(logout(navigate));
    })
    .finally(() => stopLoading(dispatch));
};

export const logout = (navigate) => async (dispatch) => {
  localStorage.clear();
  dispatch({ type: actionTypes.RESET_AUTH_STATE });
  dispatch({ type: actionTypes.RESET_SHARED_STATE });
  navigate("/", { replace: true });
};
