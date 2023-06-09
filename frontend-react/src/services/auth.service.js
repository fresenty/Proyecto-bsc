import axios from "axios";
// import API_URL from "./api-url";

const API_URL = process.env.REACT_APP_API_URL;

const AuthService = {
  login(username, password) {
    return axios
      .post(API_URL + "/auth/login", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {

          const token = response.data.accessToken;
          console.log("Token JWT recibido:", token);
 
          
          localStorage.setItem("user", JSON.stringify(response.data));

          
        }

        return response.data;
      });
  },

  logout() {
    localStorage.removeItem("user");
  },

  register(username, email, password, firstname, lastname, user_type_id) {
    console.log(user_type_id);
    return axios
      .post(API_URL + "/users/", {
        username,
        email,
        password,
        firstname,
        lastname,
        user_type_id,
      })
      .catch((err) => console.log(err));
  },

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  },
};

export default AuthService;
