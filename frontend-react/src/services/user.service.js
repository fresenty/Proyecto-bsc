import axios from "axios";
import authHeader from "./auth-header";
// import API_URL from "./api-url";

const API_URL = process.env.REACT_APP_API_URL;

const UserService = {
  getPublicContent() {
    return axios.get(API_URL + "/");
  },

  getUserBoard(id) {
    return axios.get(API_URL + "/users/" + id, { headers: authHeader() });
  },

  getAdminBoard(id) {
    return axios.get(API_URL + "/users/" + id, { headers: authHeader() });
  }
};

export default UserService;
