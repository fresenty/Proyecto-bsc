import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoticiasService from "../services/noticias.service";
import "../css/crud.css";

class CrudNoticias extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noticias: [],
      editandoNoticia: null,
      nuevaNoticia: {
        titulo: "",
        contenido: "",
        imagen: "",
      },
    };

    this.handleEliminarClick = this.handleEliminarClick.bind(this);
    this.handleEditarClick = this.handleEditarClick.bind(this);
    this.handleEditarSubmit = this.handleEditarSubmit.bind(this);
    this.handleEditarChange = this.handleEditarChange.bind(this);
    this.handleNuevoChange = this.handleNuevoChange.bind(this);
    this.handleNuevoSubmit = this.handleNuevoSubmit.bind(this);
  }

  componentDidMount() {
    this.cargarNoticias();
  }

  cargarNoticias() {
    NoticiasService.getAllNoticias().then(
      (response) => {
        const noticiasData = response.data.data;
        console.log("Respuesta del servicio:", noticiasData);
        if (Array.isArray(noticiasData)) {
          this.setState({
            noticias: noticiasData,
          });
        } else {
          console.log("La respuesta no es un array de noticias:", noticiasData);
          this.setState({
            noticias: [],
          });
        }
      },
      (error) => {
        console.log("Error al obtener noticias:", error);
        this.setState({
          noticias: [],
        });
      }
    );
  }

  handleEliminarClick(id) {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta noticia?")) {
      NoticiasService.deleteNoticia(id).then(
        () => {
          this.cargarNoticias();
          toast.success("Se ha eliminado la noticia con éxito");
        },
        (error) => {
          console.log("Error al eliminar noticia:", error);
        }
      );
    }
  }

  handleEditarClick(noticia) {
    this.setState({
      editandoNoticia: { ...noticia },
    });
  }

  handleEditarSubmit(event) {
    event.preventDefault();

    const { editandoNoticia } = this.state;

    NoticiasService.updateNoticiaByID(editandoNoticia.ID, editandoNoticia).then(
      () => {
        this.cargarNoticias();
        this.setState({
          editandoNoticia: null,
        });
        toast.success("Se ha actualizado la noticia con éxito");
      },
      (error) => {
        console.log("Error al actualizar noticia:", error);
      }
    );
  }

  handleEditarChange(event) {
    const { name, value } = event.target;

    this.setState((prevState) => ({
      editandoNoticia: {
        ...prevState.editandoNoticia,
        [name]: value,
      },
    }));
  }

  handleNuevoSubmit(event) {
    event.preventDefault();

    const { nuevaNoticia } = this.state;

    NoticiasService.createNoticia(nuevaNoticia).then(
      () => {
        this.cargarNoticias();
        this.setState({
          nuevaNoticia: {
            titulo: "",
            contenido: "",
            imagen: "",
          },
        });
        toast.success("Se ha creado la noticia con éxito");
      },
      (error) => {
        console.log("Error al crear noticia:", error);
      }
    );
  }

  handleNuevoChange(event) {
    const { name, value } = event.target;

    this.setState((prevState) => ({
      nuevaNoticia: {
        ...prevState.nuevaNoticia,
        [name]: value,
      },
    }));
  }

  render() {
    const { noticias, editandoNoticia, nuevaNoticia } = this.state;

    return (
      <div className="container-fluid mt-4 col-md-10 offset-md-1 ">
        <div className="row mb-4">
          <div className="col-md-6">
            <h2>Agregar nueva noticia</h2>
            <form onSubmit={this.handleNuevoSubmit}>
              <div className="form-group">
                <label htmlFor="titulo">Título</label>
                <input
                  type="text"
                  className="form-control"
                  id="titulo"
                  name="titulo"
                  value={nuevaNoticia.titulo}
                  onChange={this.handleNuevoChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="contenido">Contenido</label>
                <textarea
                  className="form-control"
                  id="contenido"
                  name="contenido"
                  rows="10"
                  value={nuevaNoticia.contenido}
                  onChange={this.handleNuevoChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="imagen">Imagen</label>
                <input
                  type="text"
                  className="form-control"
                  id="imagen"
                  name="imagen"
                  value={nuevaNoticia.imagen}
                  onChange={this.handleNuevoChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Agregar
              </button>
            </form>
          </div>
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Título</th>
              <th scope="col">Contenido</th>
              <th scope="col">Imagen</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {noticias.map((noticia) => (
              <tr key={noticia.ID}>
                <td>{noticia.ID}</td>
                <td>{noticia.Titulo}</td>
                <td>{noticia.Contenido.substring(0, 100) + "..."}</td>
                <td>{noticia.Imagen}</td>{" "}
                {/* Mostrar la cadena de texto de la imagen */}
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => this.handleEliminarClick(noticia.ID)}
                  >
                    Eliminar
                  </button>{" "}
                  <button
                    className="btn btn-warning"
                    onClick={() => this.handleEditarClick(noticia)}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editandoNoticia && (
          <div className="modal-overlay">
            <div className="modal show d-block" id="editarModal">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <form onSubmit={this.handleEditarSubmit}>
                    <div className="modal-header">
                      <h5 className="modal-title">Editar Noticia</h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={() => this.setState({ editandoNoticia: null })}
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="form-group">
                        <label htmlFor="titulo">Título</label>
                        <input
                          type="text"
                          className="form-control"
                          id="titulo"
                          name="Titulo" // Corregir a "Titulo"
                          value={editandoNoticia.Titulo} // Corregir a "Titulo"
                          onChange={this.handleEditarChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="contenido">Contenido</label>
                        <textarea
                          className="form-control"
                          id="contenido"
                          name="Contenido" // Corregir a "Contenido"
                          rows="10"
                          value={editandoNoticia.Contenido} // Corregir a "Contenido"
                          onChange={this.handleEditarChange}
                        />
                      </div>
                    </div>

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                        onClick={() => this.setState({ editandoNoticia: null })}
                      >
                        Cancelar
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Guardar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        <ToastContainer />
      </div>
    );
  }
}

export default CrudNoticias;
