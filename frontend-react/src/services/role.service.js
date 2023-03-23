import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const RoleService = {
  getRoles() {
    return axios.get(API_URL + "/roles", {
      headers: authHeader(),
    });
  },
};

export default RoleService;
