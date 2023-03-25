import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const NoticiasService = {
  getAllNoticias() {
    return axios.get(API_URL + '/noticias/');
  },

  getNoticiaByID(id) {
    return axios.get(API_URL + '/noticias/' + id);
  },

  createNoticia(noticia) {
    return axios.post(API_URL + '/noticias/', noticia);
  },

  updateNoticiaByID(id, noticia) {
    return axios.put(API_URL + '/noticias/' + id, noticia);
  },

  deleteNoticia(id) {
    return axios.delete(API_URL + '/noticias/' + id);
  }
};

export default NoticiasService;