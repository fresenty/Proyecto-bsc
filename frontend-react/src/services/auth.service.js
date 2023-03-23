import axios from "axios";
// import API_URL from "./api-url";

const API_URL = process.env.REACT_APP_API_URL

const AuthService = {
  login(username, password) {
    return axios
      .post(API_URL + "/auth/login", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));

          // Cookies.set('access', String(data.data.access), {
          //   expires: 365
          // });
          // Cookies.set('refresh', String(data.data.refresh), {
          //   expires: 365
          // });
        }

        return response.data;
      });
  },

  logout() {
    localStorage.removeItem("user");
  },

  register(username, email, password, firstname, lastname, user_type_id) {
    return axios.post(API_URL + "/users/", {
      username,
      email,
      password,
      firstname,
      lastname,
      user_type_id,
    });
  },

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default AuthService;
