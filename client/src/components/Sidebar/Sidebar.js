import { Link, useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

// import styles
import "./Sidebar.scss";
import { logout } from "../../redux/actions/auth";
import { TOGGLE_LOGIN } from "../../redux/actions/types";

const Sidebar = (props) => {
  const { pathname } = useLocation();
  const { loggedIn, logoutUser, openLogin } = props; // get state from props
  const navigate = useNavigate();

  return (
    <div className="left-navbar" id="nav-bar">
      <nav className="nav">
        <Link to="" className="nav__logo">
          <i className="bx bx-layer nav__logo-icon"></i>
          <span className="nav__logo-name"></span>
        </Link>
        <div className="nav__list">
          {/* unprotected links */}
          <>
            <Link
              to="/"
              className={
                `${pathname}` === "/" ? "nav__link active" : "nav__link"
              }
            >
              <i class="bx bx-home" title="Home"></i>
              <span className="nav__name">Home</span>
            </Link>
            <Link
              to="/"
              className={
                `${pathname}` === "/" ? "nav__link active" : "nav__link"
              }
            >
              <i class="bx bxs-info-circle" title="About"></i>
              <span className="nav__name">About</span>
            </Link>
            {!loggedIn && (
              <>
                <Link
                  to="/"
                  className={
                    `${pathname}` === "/" ? "nav__link active" : "nav__link"
                  }
                  onClick={openLogin}
                >
                  <i class="bx bx-log-in" title="Login"></i>
                  <span className="nav__name">Login</span>
                </Link>
              </>
            )}

            {loggedIn && (
              <>
                <Link
                  to="/"
                  className={
                    `${pathname}` === "/" ? "nav__link active" : "nav__link"
                  }
                >
                  <i class="bx bx-log-out" title="Login"></i>
                  <span
                    className="nav__name"
                    onClick={() => logoutUser(navigate)}
                  >
                    Logout
                  </span>
                </Link>
              </>
            )}
          </>
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth?.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openLogin: () => dispatch({ type: TOGGLE_LOGIN, payload: true }),
    logoutUser: (navigate) => dispatch(logout(navigate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
