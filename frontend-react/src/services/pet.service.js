import axios from "axios";
import authHeader from "./auth-header";
// import API_URL from "./api-url";

const API_URL = process.env.REACT_APP_API_URL;

const PetService = {
  getPublicContent() {
    return axios.get(API_URL + "/");
  },

  getUserPets(user_id) {
    return axios.get(API_URL + "/owns/search?user_id=" + user_id, {
      headers: authHeader(),
    });
  },

  registerPet(name, type, breed, gender, color, birth_date) {
    birth_date = new Date(birth_date).toISOString();
    return axios.post(
      API_URL + "/pets",
      {
        name,
        type,
        breed,
        gender,
        color,
        birth_date,
      },
      { headers: authHeader() }
    );
  },

  transferPet(user_id, pet_id, username) {
    return axios.post(
      API_URL + "/owns/transfer?user_id=" + user_id + "&pet_id=" + pet_id,
      {
        username,
      },
      { headers: authHeader() }
    );
  },

  getPet(pet_id) {
    return axios.get(API_URL + "/pets/" + pet_id, {
      headers: authHeader(),
    });
  },

  putPetImage(pet_id, form_data) {
    return axios.put(API_URL + "/pets/image/" + pet_id, form_data, {
      headers: authHeader(),
      "Content-Type": "multipart/form-data",
    });
  },

  // getModeratorBoard() {
  //   return axios.get(API_URL + "mod", { headers: authHeader() });
  // }

  // getAdminBoard() {
  //   return axios.get(API_URL + "admin", { headers: authHeader() });
  // }
};

export default PetService;
