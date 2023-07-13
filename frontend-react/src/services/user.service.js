import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const UserService = {
  getAllUsuarios() {
    return axios.get(API_URL + '/users/');
  },

  getUsuarioByID(id) {
    return axios.get(API_URL + '/users/' + id);
  },

  createUsuario(usuario) {
    // Agregar el tipo de usuario al objeto usuario
    const usuarioConTipo = {
      ...usuario,
      usertypeid: obtenerTipoUsuarioId(usuario.usertype),
    };

    return axios.post(API_URL + '/users/', usuarioConTipo);
  },

  updateUsuarioByID(id, usuario) {
    return axios.put(API_URL + '/users/' + id, usuario);
  },

  deleteUsuario(id) {
    return axios.delete(API_URL + '/users/' + id);
  },

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

// Función para obtener el ID del tipo de usuario basado en el nombre
function obtenerTipoUsuarioId(tipoUsuario) {
  switch (tipoUsuario) {
    case "academico":
      return 1;
    case "empresario":
      return 2;
    case "administrador":
      return 3;
    default:
      return 1;
  }
}

export default UserService;
