import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { TOGGLE_LOGIN } from "../../redux/actions/types";
// styles
import "./NotFound.scss";

function NotFound(props) {
  const { loggedIn } = props;
  const { openLogin } = props;

  return (
    <div className="not__found">
      <h1 className="not__foundHeading">Lost your way?</h1>

      {!loggedIn && (
        <>
          <p>This may be a protected page, you may need to login to view it.</p>
          <br />
          <button
            type="button"
            style={{
              backgroundColor: "dodgerblue",
              padding: "8px 15px",
              color: "white",
              fontWeight: "bold",
            }}
            onClick={openLogin}
          >
            Login Now
          </button>
        </>
      )}
      {loggedIn && (
        <>
          {" "}
          <p>Sorry, looks like we sent you the wrong way.</p>
          <br />
          <Link
            to={`/`}
            style={{
              backgroundColor: "dodgerblue",
              padding: "8px 15px",
              color: "white",
              fontWeight: "bold",
              borderRadius: "25px",
            }}
          >
            Back Home
          </Link>
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state?.auth?.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openLogin: () => dispatch({ type: TOGGLE_LOGIN, payload: true }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotFound);
