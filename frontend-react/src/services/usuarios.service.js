import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const UsuariosService = {
  getAllUsuarios() {
    return axios.get(API_URL + '/users/');
  },

  getUsuarioByID(id) {
    return axios.get(API_URL + '/users/' + id);
  },

  createUsuario(usuario) {
    return axios.post(API_URL + '/users/', usuario);
  },

  updateUsuarioByID(id, usuario) {
    return axios.put(API_URL + '/users/' + id, usuario);
  },

  deleteUsuario(id) {
    return axios.delete(API_URL + '/users/' + id);
  }
};

export default UsuariosService;
