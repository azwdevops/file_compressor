import API from "../shared/axios";

export const getUserData = () => API.get(`/api/user/get-user-data/`);
