import axios from "axios";

import globals from "./globals";

const { liveProduction, productionHome, devHome } = globals;

let URL;
if (liveProduction) {
  URL = productionHome;
} else {
  URL = devHome;
}

const API = axios.create({ baseURL: URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("access_token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem(
      "access_token"
    )}`;
    req.headers.Accept = "application/json";
  }
  return req;
});

export default API;
