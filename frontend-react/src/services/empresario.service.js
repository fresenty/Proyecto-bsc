import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const empresariosService = {
  getAllempresarios() {
    return axios.get(API_URL + "/empresarios/");
  },

  getInscripcionesbyUserID() {
    return axios.get(API_URL + "/inscripciones/" + sessionStorage.getItem("userID"))
      .then(response => {return response.data.data});
  },
  
  updateIsComplete(userID) {
    return axios.put(API_URL + "/inscripciones/iscomplete/" + userID);
  },

  getempresarioByID(id) {
    return axios.get(API_URL + "/empresarios/" + id);
  },

  createempresario(empresario) {
    return axios.post(API_URL + "/empresarios/", empresario);
  },

  updateempresarioByID(id, empresario) {
    return axios.put(API_URL + "/empresarios/" + id, empresario);
  },

  deleteempresario(id) {
    return axios.delete(API_URL + "/empresarios/" + id);
  },
};

export default empresariosService;
