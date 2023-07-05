import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const AcademicosService = {
  getAllAcademicos() {
    return axios.get(API_URL + "/academicos/");
  },

  updateIsComplete(userID) {
    return axios.put(API_URL + "/inscripciones/iscomplete/" + userID);
  },

  getAcademicoByID(id) {
    return axios.get(API_URL + "/academicos/" + id);
  },

  createAcademico(academico) {
    return axios.post(API_URL + "/academicos/", academico);
  },

  updateAcademicoByID(id, academico) {
    return axios.put(API_URL + "/academicos/" + id, academico);
  },

  deleteAcademico(id) {
    return axios.delete(API_URL + "/academicos/" + id);
  },
};

export default AcademicosService;
