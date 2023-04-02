import React, { Component } from "react";
import NoticiasService from "../services/noticias.service";
import "../css/noticias.css";

class Noticias extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noticias: [],
      noticiaSeleccionada: null,
    };

    this.handleNoticiaClick = this.handleNoticiaClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    NoticiasService.getAllNoticias().then(
      (response) => {
        const noticias = response.data.data;
        const getNoticiaImagenes = noticias.map((noticia) => {
          return NoticiasService.getNoticiaByID(noticia.ID).then((response) => {
            return {
              ...noticia,
              ImagenURL: response.data.data.Imagen,
            };
          });
        });
        Promise.all(getNoticiaImagenes).then((noticiasConImagenes) => {
          this.setState({
            noticias: noticiasConImagenes,
          });
        });
      },
      (error) => {
        console.log("Error al obtener noticias:", error);
        this.setState({
          noticias:
            (error.response && error.response.data) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  handleNoticiaClick(noticia) {
    this.setState({
      noticiaSeleccionada: noticia,
    });
  }

  handleClose() {
    this.setState({
      noticiaSeleccionada: null,
    });
  }

  render() {
    let noticias = [];

    if (Array.isArray(this.state.noticias)) {
      noticias = this.state.noticias;
    }

    return (
      <div className="container-fluid mt-4">
        <div className="row">
          {noticias.map((noticia) => (
            <div key={noticia.ID} className="col-md-4 mb-4">
              <div className="card">
                <img
                  src={process.env.REACT_APP_API_IMAGES + noticia.ImagenURL}
                  className="card-img-top"
                  alt={noticia.Titulo}
                />
                <div className="card-body">
                  <h5 className="card-title">{noticia.Titulo}</h5>
                  <p className="card-text">
                    {noticia.Contenido.substring(0, 100) + "..."}
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => this.handleNoticiaClick(noticia)}
                  >
                    Leer más
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {this.state.noticiaSeleccionada && (
          <div className="modal-overlay">
          <div className="modal show d-block" id="noticiaModal">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {this.state.noticiaSeleccionada.Titulo}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={this.handleClose}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <img
                    src={
                      process.env.REACT_APP_API_IMAGES +
                      this.state.noticiaSeleccionada.ImagenURL
                    }
                    className="img-fluid"
                    alt={this.state.noticiaSeleccionada.Titulo}
                  />
                  <br />

                  <p
                    dangerouslySetInnerHTML={{
                      __html: this.state.noticiaSeleccionada.Contenido,
                    }}
                  ></p>
                </div>
              </div>
            </div>
          </div>
          </div>
        )}
      </div>
    );
  }
}

export default Noticias;
