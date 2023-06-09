import React, { useState } from "react";
import MinDialog from "../common/MinDialog";
import { connect } from "react-redux";
import { TOGGLE_LOADING, TOGGLE_LOGIN } from "../../redux/actions/types";
import API from "../../shared/axios";
import { showError } from "../../redux/actions/shared";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { get_user_data } from "../../redux/actions/auth";

const Login = (props) => {
  const { loginForm, loading } = props;
  const { startLoading, stopLoading, closeLogin, getUserData } = props;
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = loginData;

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    startLoading();
    await API.post(`/api/user/login/`, loginData)
      .then((res) => {
        localStorage.setItem("access_token", res?.data?.access_token);
        getUserData(navigate);
        closeLogin();
      })
      .catch((err) => showError(err))
      .finally(() => stopLoading());
  };

  return (
    <MinDialog isOpen={loginForm} maxWidth="500px">
      <form
        className="dialog"
        id={loading && "formLoading"}
        onSubmit={handleSubmit}
      >
        <h3>Login Now</h3>
        <div className="dialog__rowSingleItem">
          <label htmlFor="">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={email}
            required
          />
        </div>
        {loading && (
          <CircularProgress
            style={{ position: "absolute", marginLeft: "45%" }}
          />
        )}
        <div className="dialog__rowSingleItem">
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={password}
            required
          />
        </div>
        <div className="form__Buttons">
          <button type="button" className="close__button" onClick={closeLogin}>
            Close
          </button>
          <button type="submit" className="continue__button">
            Submit
          </button>
        </div>
      </form>
    </MinDialog>
  );
};

const mapStateToProps = (state) => {
  return {
    loginForm: state?.auth?.loginForm,
    loading: state?.shared?.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startLoading: () => dispatch({ type: TOGGLE_LOADING, payload: true }),
    stopLoading: () => dispatch({ type: TOGGLE_LOADING, payload: false }),
    closeLogin: () => dispatch({ type: TOGGLE_LOGIN, payload: false }),
    getUserData: (navigate) => dispatch(get_user_data(navigate)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
