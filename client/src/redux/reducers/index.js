import { combineReducers } from "@reduxjs/toolkit";

import auth from "./auth";
import shared from "./shared";

export default combineReducers({
  auth,
  shared,
});
