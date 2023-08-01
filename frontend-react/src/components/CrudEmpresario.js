import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Academicos from "./CrudAcademico";
import CrudVisitante from "./CrudVisitante";
import EmpresariosService from "../services/empresario.service";
import AcademicosService from "../services/academico.service";
import VisitantesService from "../services/visitante.service";
import { redirect } from "react-router-dom";
import "../css/crud.css";

class Empresarios extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showEmpre: true,
      showAca: false,
      showVisi: false,
      empre: false,
      aca: false,
      visi: false,
      empresarios: [],
      academicos: [],
      visitantes: [],
      editandoEmpresario: null,
      nuevoEmpresario: {
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
    this.cargarEmpresarios();
  }

  cargarEmpresarios() {
    EmpresariosService.getAllempresarios().then(
      (response) => {
        this.setState({
          empresarios: response.data.data,
        });
      },
      (error) => {
        if (error.response.status === 401) {
          return redirect("/");
        }
        console.log("Error al obtener empresarios:", error);
        this.setState({
          empresarios:
            (error.response && error.response.data) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  cargarAcademicos() {
    AcademicosService.getAllAcademicos().then(
      (response) => {
        this.setState({
          academicos: response.data.data,
        });
      },
      (error) => {
        if (error.response.status == 401) {
          return redirect("/");
        }
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

  cargarVisitantes() {
    VisitantesService.getAllVisitantes().then(
      (response) => {
        this.setState({
          visitantes: response.data.data,
        });
      },
      (error) => {
        if (error.response.status == 401) {
          return redirect("/");
        }
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
      window.confirm("¿Estás seguro de que quieres eliminar este empresario?")
    ) {
      EmpresariosService.deleteempresario(id).then(
        () => {
          this.cargarEmpresarios();
          toast.success("Se ha eliminado el empresario con éxito");
        },
        (error) => {
          console.log("Error al eliminar empresario:", error);
        }
      );
    }
  }

  handleEditarClick(empresario) {
    this.setState({
      editandoEmpresario: { ...empresario },
    });
  }

  handleEditarSubmit(event) {
    event.preventDefault();

    const { editandoEmpresario } = this.state;

    EmpresariosService.updateempresarioByID(
      editandoEmpresario.ID,
      editandoEmpresario
    ).then(
      () => {
        this.cargarEmpresarios();
        this.setState({
          editandoEmpresario: null,
        });
        toast.success("Se ha actualizado el empresario con éxito");
      },
      (error) => {
        console.log("Error al actualizar empresario:", error);
      }
    );
  }

  handleEditarChange(event) {
    const { name, value } = event.target;

    if (this.state.showEmpre) {
      this.setState((prevState) => ({
        editandoEmpresario: {
          ...prevState.editandoEmpresario,
          [name]: value,
        },
      }));
    }
  }

  handleNuevoSubmit(event) {
    event.preventDefault();

    const { nuevoEmpresario } = this.state;

    if (this.state.empre) {
      EmpresariosService.createempresario(nuevoEmpresario).then(
        () => {
          this.cargarEmpresarios();
          this.setState({
            nuevoEmpresario: {
              Titulo: "",
              Contenido: "",
            },
          });
          toast.success("Se ha creado el empresario con éxito");
        },
        (error) => {
          console.log("Error al crear empresario:", error);
        }
      );
    }
    if (this.state.aca) {
      AcademicosService.createAcademico(nuevoEmpresario).then(
        () => {
          this.cargarAcademicos();
          this.setState({
            nuevoEmpresario: {
              Titulo: "",
              Contenido: "",
            },
          });
          toast.success("Se ha creado el académico con éxito");
        },
        (error) => {
          console.log("Error al crear académico:", error);
        }
      );
    }
    if (this.state.visi) {
      VisitantesService.createVisitante(nuevoEmpresario).then(
        () => {
          this.cargarVisitantes();
          this.setState({
            nuevoEmpresario: {
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
  }

  handleNuevoChange(event) {
    const { name, value } = event.target;

    this.setState((prevState) => ({
      nuevoEmpresario: {
        ...prevState.nuevoEmpresario,
        [name]: value,
      },
    }));
  }

  render() {
    let empresarios = [];

    if (Array.isArray(this.state.empresarios)) {
      empresarios = this.state.empresarios;
    }

    return (
      <div className="container-fluid mt-4 col-md-10 offset-md-1 ">
        <div className="row mb-4">
          <div className="col-md-6">
            <h2>Agregar nuevo curso</h2>
            <form onSubmit={this.handleNuevoSubmit}>
              <div className="form-group">
                <label htmlFor="titulo">Título</label>
                <input
                  type="text"
                  className="form-control"
                  id="titulo"
                  name="Titulo"
                  value={this.state.nuevoEmpresario.Titulo}
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
                  value={this.state.nuevoEmpresario.Contenido}
                  onChange={this.handleNuevoChange}
                />
              </div>
              <div className="form-group">
                <h2>Tipos de Curso: </h2>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="tipo1"
                    onChange={(e) => this.setState({ empre: e.target.checked })}
                  />
                  <label className="form-check-label" htmlFor="tipo1">
                    Empresario
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="tipo2"
                    onChange={(e) => this.setState({ aca: e.target.checked })}
                  />
                  <label className="form-check-label" htmlFor="tipo2">
                    Académico
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="tipo3"
                    onChange={(e) => this.setState({ visi: e.target.checked })}
                  />
                  <label className="form-check-label" htmlFor="tipo3">
                    Visitante
                  </label>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Agregar
              </button>
            </form>
          </div>
        </div>

        <ul className="nav nav-tabs">
          <li className={"nav-item"}>
            <a
              className={
                this.state.showEmpre
                  ? "nav-link text-dark active"
                  : "nav-link text-primary"
              }
              onClick={() =>
                this.setState({
                  showEmpre: true,
                  showAca: false,
                  showVisi: false,
                })
              }
              href="#"
            >
              Empresarios
            </a>
          </li>
          <li className={"nav-item"}>
            <a
              className={
                this.state.showAca
                  ? "nav-link text-dark active"
                  : "nav-link text-primary"
              }
              onClick={() =>
                this.setState({
                  showEmpre: false,
                  showAca: true,
                  showVisi: false,
                })
              }
              href="#"
            >
              Académicos
            </a>
          </li>
          <li className={"nav-item"}>
            <a
              className={
                this.state.showVisi
                  ? "nav-link text-dark active"
                  : "nav-link text-primary"
              }
              onClick={() =>
                this.setState({
                  showEmpre: false,
                  showAca: false,
                  showVisi: true,
                })
              }
              href="#"
            >
              Visitantes
            </a>
          </li>
        </ul>

        {this.state.showEmpre && (
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
              {this.state.empresarios.map((empresario) => (
              <tr key={empresario.ID}>
                <td>{empresario.ID}</td>
                <td>{empresario.Titulo}</td>
                <td className="text-break">{empresario.Contenido.substring(0, 100) + "..."}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => this.handleEliminarClick(empresario.ID)}
                  >
                    Eliminar
                  </button>{" "}
                  <button
                    className="btn btn-warning"
                    onClick={() => this.handleEditarClick(empresario)}
                  >
                    Editar
                  </button>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        )}
        {this.state.showAca && <Academicos />}
        {this.state.showVisi && <CrudVisitante />}

        {this.state.editandoEmpresario && (
          <div className="modal-overlay">
            <div className="modal show d-block" id="editarModal">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <form onSubmit={this.handleEditarSubmit}>
                    <div className="modal-header">
                      <h5 className="modal-title">Editar Empresario</h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={() =>
                          this.setState({ editandoEmpresario: null })
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
                          value={this.state.editandoEmpresario.Titulo}
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
                          value={this.state.editandoEmpresario.Contenido}
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
                          this.setState({ editandoEmpresario: null })
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

export default Empresarios;