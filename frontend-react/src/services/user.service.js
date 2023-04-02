import axios from "axios";
import authHeader from "./auth-header";

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
  },

  getAllHome() {
    return axios.get(API_URL + '/home');
  },

  getHomeByID(id) {
    return axios.get(API_URL + '/home/' + id);
  },

  createHome(homes) {
    return axios.post(API_URL + '/home', homes);
  },

  updateHomeByID(id, homes) {
    return axios.put(API_URL + '/home/' + id, homes);
  },

  deleteHome(id) {
    return axios.delete(API_URL + '/home/' + id);
  }
};

export default UserService;
