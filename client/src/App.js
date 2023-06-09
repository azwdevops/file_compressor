import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";
import NotFound from "./pages/NotFound/NotFound";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import { connect } from "react-redux";
import { useEffect } from "react";
import { get_user_data } from "./redux/actions/auth";

function App(props) {
  const { getUserData } = props;
  const navigate = useNavigate();

  const access_token = localStorage.getItem("access_token");

  useEffect(() => {
    if (access_token) {
      getUserData(navigate);
    }
  }, [access_token, getUserData, navigate]);

  return (
    <div id="body-pd">
      <Header />
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserData: (navigate) => dispatch(get_user_data(navigate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
