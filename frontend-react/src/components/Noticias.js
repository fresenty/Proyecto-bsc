import React, { Component } from 'react';
import NoticiasService from '../services/noticias.service';

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
            const decodedBase64 = atob(response.data.data.Imagen);
            const imagenURL = `data:image/jpeg;base64,${decodedBase64}`;
            return {
              ...noticia,
              ImagenURL: imagenURL
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
    console.log(this.state.content);
    const { content } = this.state;
    return (
      <div>
        <ul>
          {content.map((noticia) => (
            <li key={noticia.ID}>
              <h2>{noticia.Titulo}</h2>
              {noticia.ImagenURL && <img src={noticia.ImagenURL} alt="Imagen de noticia" />} {/* Si la noticia tiene imagen, la muestra */}
              <p>{noticia.Contenido}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Noticias;