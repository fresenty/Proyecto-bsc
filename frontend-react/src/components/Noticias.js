import React, { Component } from 'react';
import NoticiasService from '../services/noticias.service';
import "../css/coins.css";

class Noticias extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
    };
  }

  componentDidMount() {
    NoticiasService.getAllNoticias().then(
      (response) => {
        console.log('Respuesta del servicio:', response);
        const noticias = response.data.data;
        const getNoticiaImagenes = noticias.map(noticia => {
          return NoticiasService.getNoticiaByID(noticia.ID).then(response => {
            console.log('Respuesta del servicio para noticia con ID', noticia.ID, ':', response.data);
            return {
              ...noticia,
              ImagenURL: response.data.data.Imagen
            }
          });
        });
        Promise.all(getNoticiaImagenes).then(noticiasConImagenes => {
          this.setState({
            content: noticiasConImagenes,
          });
        });
      },
      (error) => {
        console.log('Error al obtener noticias:', error);
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }
  render() {
    const { content } = this.state;
    return (
      <div className="container">
        <div className="row">
          {content.map((noticia) => (
            <div className="col-sm-4" key={noticia.ID}>
              <div className="card">
                <img src={process.env.REACT_APP_API_IMAGES+noticia.Imagen} className="card-img-top" alt="Imagen de noticia" />
                <div className="card-body">
                  <h5 className="card-title">{noticia.Titulo}</h5>
                  <p className="card-text">{noticia.Contenido}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Noticias;