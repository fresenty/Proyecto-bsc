import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VisitantesService from "../services/visitante.service";
import "../css/crud.css";

class CrudVisitante extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visitantes: [],
      editandoVisitante: null,
      nuevoVisitante: {
        Titulo: "",
        Contenido: "",
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
    this.cargarVisitantes();
  }

  cargarVisitantes() {
    VisitantesService.getAllVisitantes().then(
      (response) => {
        this.setState({
          visitantes: response.data.data,
        });
      },
      (error) => {
        console.log("Error al obtener visitantes:", error);
        this.setState({
          visitantes:
            (error.response && error.response.data) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  handleEliminarClick(id) {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este visitante?")
    ) {
      VisitantesService.deleteVisitante(id).then(
        () => {
          this.cargarVisitantes();
          toast.success("Se ha eliminado el visitante con éxito");
        },
        (error) => {
          console.log("Error al eliminar visitante:", error);
        }
      );
    }
  }

  handleEditarClick(visitante) {
    this.setState({
      editandoVisitante: { ...visitante },
    });
  }

  handleEditarSubmit(event) {
    event.preventDefault();

    const { editandoVisitante } = this.state;

    VisitantesService.updateVisitanteByID(
      editandoVisitante.ID,
      editandoVisitante
    ).then(
      () => {
        this.cargarVisitantes();
        this.setState({
          editandoVisitante: null,
        });
        toast.success("Se ha actualizado el visitante con éxito");
      },
      (error) => {
        console.log("Error al actualizar visitante:", error);
      }
    );
  }

  handleEditarChange(event) {
    const { name, value } = event.target;

    this.setState((prevState) => ({
      editandoVisitante: {
        ...prevState.editandoVisitante,
        [name]: value,
      },
    }));
  }

  handleNuevoSubmit(event) {
    event.preventDefault();

    const { nuevoVisitante } = this.state;

    VisitantesService.createVisitante(nuevoVisitante).then(
      () => {
        this.cargarVisitantes();
        this.setState({
          nuevoVisitante: {
            Titulo: "",
            Contenido: "",
          },
        });
        toast.success("Se ha creado el visitante con éxito");
      },
      (error) => {
        console.log("Error al crear visitante:", error);
      }
    );
  }

  handleNuevoChange(event) {
    const { name, value } = event.target;

    this.setState((prevState) => ({
      nuevoVisitante: {
        ...prevState.nuevoVisitante,
        [name]: value,
      },
    }));
  }

  render() {
    let visitantes = [];

    if (Array.isArray(this.state.visitantes)) {
      visitantes = this.state.visitantes;
    }

    return (
      <div className="container-fluid mt-4 col-md-10 offset-md-1 ">
        <div className="row mb-4">
          <div className="col-md-6">
            <h2>Agregar nuevo curso "Visitante"</h2>
            <form onSubmit={this.handleNuevoSubmit}>
              <div className="form-group">
                <label htmlFor="titulo">Título</label>
                <input
                  type="text"
                  className="form-control"
                  id="titulo"
                  name="Titulo"
                  value={this.state.nuevoVisitante.Titulo}
                  onChange={this.handleNuevoChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="contenido">Contenido</label>
                <textarea
                  className="form-control"
                  id="contenido"
                  name="Contenido"
                  rows="10"
                  value={this.state.nuevoVisitante.Contenido}
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
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {visitantes.map((visitante) => (
              <tr key={visitante.ID}>
                <td>{visitante.ID}</td>
                <td>{visitante.Titulo}</td>
                <td>{visitante.Contenido.substring(0, 100) + "..."}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => this.handleEliminarClick(visitante.ID)}
                  >
                    Eliminar
                  </button>{" "}
                  <button
                    className="btn btn-warning"
                    onClick={() => this.handleEditarClick(visitante)}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {this.state.editandoVisitante && (
          <div className="modal-overlay">
            <div className="modal show d-block" id="editarModal">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <form onSubmit={this.handleEditarSubmit}>
                    <div className="modal-header">
                      <h5 className="modal-title">Editar Visitante</h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={() =>
                          this.setState({ editandoVisitante: null })
                        }
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
                          name="Titulo"
                          value={this.state.editandoVisitante.Titulo}
                          onChange={this.handleEditarChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="contenido">Contenido</label>
                        <textarea
                          className="form-control"
                          id="contenido"
                          name="Contenido"
                          rows="10"
                          value={this.state.editandoVisitante.Contenido}
                          onChange={this.handleEditarChange}
                        />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                        onClick={() =>
                          this.setState({ editandoVisitante: null })
                        }
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

export default CrudVisitante;
