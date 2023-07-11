import React, { Component } from "react";
import AcademicosService from "../services/academico.service";
import "../css/crud.css";

class Academicos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      academicos: [],
      editandoAcademico: null,
      nuevoAcademico: {
        Titulo: "",
        Contenido: ""
      }
    };

    this.handleEliminarClick = this.handleEliminarClick.bind(this);
    this.handleEditarClick = this.handleEditarClick.bind(this);
    this.handleEditarSubmit = this.handleEditarSubmit.bind(this);
    this.handleEditarChange = this.handleEditarChange.bind(this);
    this.handleNuevoChange = this.handleNuevoChange.bind(this);
    this.handleNuevoSubmit = this.handleNuevoSubmit.bind(this);
  }

  componentDidMount() {
    this.cargarAcademicos();
  }

  cargarAcademicos() {
    AcademicosService.getAllAcademicos().then(
      (response) => {
        this.setState({
          academicos: response.data.data,
        });
      },
      (error) => {
        console.log("Error al obtener academicos:", error);
        this.setState({
          academicos:
            (error.response && error.response.data) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  handleEliminarClick(id) {
    if (window.confirm("¿Estás seguro de que quieres eliminar este académico?")) {
      AcademicosService.deleteAcademico(id).then(
        () => {
          this.cargarAcademicos();
        },
        (error) => {
          console.log("Error al eliminar académico:", error);
        }
      );
    }
  }

  handleEditarClick(academico) {
    this.setState({
      editandoAcademico: { ...academico },
    });
  }

  handleEditarSubmit(event) {
    event.preventDefault();

    const { editandoAcademico } = this.state;

    AcademicosService.updateAcademicoByID(editandoAcademico.ID, editandoAcademico).then(
      () => {
        this.cargarAcademicos();
        this.setState({
          editandoAcademico: null,
        });
      },
      (error) => {
        console.log("Error al actualizar académico:", error);
      }
    );
  }

  handleEditarChange(event) {
    const { name, value } = event.target;

    this.setState((prevState) => ({
      editandoAcademico: {
        ...prevState.editandoAcademico,
        [name]: value,
      },
    }));
  }

  handleNuevoSubmit(event) {
    event.preventDefault();

    const { nuevoAcademico } = this.state;

    AcademicosService.createAcademico(nuevoAcademico).then(
      () => {
        this.cargarAcademicos();
        this.setState({
          nuevoAcademico: {
            Titulo: "",
            Contenido: ""
          }
        });
      },
      (error) => {
        console.log("Error al crear académico:", error);
      }
    );
  }

  handleNuevoChange(event) {
    const { name, value } = event.target;

    this.setState((prevState) => ({
      nuevoAcademico: {
        ...prevState.nuevoAcademico,
        [name]: value,
      },
    }));
  }

  render() {
    let academicos = [];

    if (Array.isArray(this.state.academicos)) {
      academicos = this.state.academicos;
    }

    return (
      <div className="container-fluid mt-4 col-md-10 offset-md-1 ">
        <div className="row mb-4">
          <div className="col-md-6">
            <h2>Agregar Nuevo Académico</h2>
            <form onSubmit={this.handleNuevoSubmit}>
              <div className="form-group">
                <label htmlFor="titulo">Título</label>
                <input
                  type="text"
                  className="form-control"
                  id="titulo"
                  name="Titulo"
                  value={this.state.nuevoAcademico.Titulo}
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
                  value={this.state.nuevoAcademico.Contenido}
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
            {academicos.map((academico) => (
              <tr key={academico.ID}>
                <td>{academico.ID}</td>
                <td>{academico.Titulo}</td>
                <td>{academico.Contenido.substring(0, 100) + "..."}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => this.handleEliminarClick(academico.ID)}
                  >
                    Eliminar
                  </button>{" "}
                  <button
                    className="btn btn-warning"
                    onClick={() => this.handleEditarClick(academico)}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {this.state.editandoAcademico && (
          <div className="modal-overlay">
            <div className="modal show d-block" id="editarModal">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <form onSubmit={this.handleEditarSubmit}>
                    <div className="modal-header">
                      <h5 className="modal-title">Editar Académico</h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={() =>
                          this.setState({ editandoAcademico: null })
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
                          value={this.state.editandoAcademico.Titulo}
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
                          value={this.state.editandoAcademico.Contenido}
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
                          this.setState({ editandoAcademico: null })
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
      </div>
    );
  }
}

export default Academicos;
