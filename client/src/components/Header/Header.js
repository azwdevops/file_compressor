import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import { showNavbar } from "../../shared/scripts";
import { connect } from "react-redux";
import { TOGGLE_LOGIN } from "../../redux/actions/types";
import Login from "../users/Login";

const Header = (props) => {
  const { openLogin, loginForm, loggedIn, first_name } = props;

  return (
    <>
      <div className="header">
        <div className="header__left">
          <i
            className="bx bx-menu showBtn dodgerblue"
            id="mobile__menuBtnShow"
            onClick={showNavbar}
          ></i>
          <i
            className="bx bx-window-close hideBtn red"
            onClick={showNavbar}
            id="mobile__menuBtnHide"
          ></i>

          <h1 title="Home">
            <Link to="/">File Compressor</Link>
          </h1>
        </div>

        <div className="header__right">
          {!loggedIn && (
            <Link to="#" onClick={openLogin}>
              Login
            </Link>
          )}
          {loggedIn && (
            <Link to="#" className="green">
              &bull; {first_name}
            </Link>
          )}
        </div>
      </div>
      {loginForm && <Login />}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loginForm: state?.auth?.loginForm,
    loggedIn: state?.auth?.loggedIn,
    first_name: state?.auth?.user?.first_name,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openLogin: () => dispatch({ type: TOGGLE_LOGIN, payload: true }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
