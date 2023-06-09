import { useState } from "react";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import "./Home.scss";
import API from "../../shared/axios";
import { connect } from "react-redux";
import { TOGGLE_LOADING } from "../../redux/actions/types";
import { showError } from "../../redux/actions/shared";

const Home = (props) => {
  const { startLoading, stopLoading, loading } = props;

  const [attachments, setAttachments] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let body = new FormData();
    for (const item of attachments) {
      body.append(item?.name, item, item?.name);
    }

    startLoading();
    await API.post(`/api/core/compress-pdf/`, body)
      .then((res) => {
        window.alert(res?.data?.detail);
      })
      .catch((err) => showError(err))
      .finally(() => stopLoading());
  };

  return (
    <>
      <div className="home" id={loading && "formLoading"}>
        <h3>You can select multiple files for upload</h3>
        <input
          type="file"
          onChange={(e) =>
            setAttachments([...attachments, e?.target?.files[0]])
          }
          multiple="multiple"
        />
        {loading && (
          <CircularProgress
            style={{
              position: "absolute",
              marginLeft: "-10%",
            }}
            size="3rem"
            thickness={5}
          />
        )}
        <br />

        <button type="button" className="add__button" onClick={handleSubmit}>
          Upload
        </button>
      </div>
      {/* child components */}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state?.shared?.loading,
    loggedIn: state?.auth?.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startLoading: () => dispatch({ type: TOGGLE_LOADING, payload: true }),
    stopLoading: () => dispatch({ type: TOGGLE_LOADING, payload: false }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
