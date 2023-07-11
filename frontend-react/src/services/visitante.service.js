import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const VisitantesService = {
  getAllVisitantes() {
    return axios.get(API_URL + '/visitantes/');
  },

  getVisitanteByID(id) {
    return axios.get(API_URL + '/visitantes/' + id);
  },

  createVisitante(visitante) {
    return axios.post(API_URL + '/visitantes/', visitante);
  },

  updateVisitanteByID(id, visitante) {
    return axios.put(API_URL + '/visitantes/' + id, visitante);
  },

  deleteVisitante(id) {
    return axios.delete(API_URL + '/visitantes/' + id);
  }
};

export default VisitantesService;
