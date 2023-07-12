import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmpresariosService from "../services/empresario.service";
import "../css/crud.css";

class Empresarios extends Component {
  constructor(props) {
    super(props);

    this.state = {
      empresarios: [],
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

  handleEliminarClick(id) {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este académico?")
    ) {
      EmpresariosService.deleteempresario(id).then(
        () => {
          this.cargarEmpresarios();
          toast.success("Se ha eliminado el empresario con éxito");
        },
        (error) => {
          console.log("Error al eliminar académico:", error);
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
        console.log("Error al actualizar académico:", error);
      }
    );
  }

  handleEditarChange(event) {
    const { name, value } = event.target;

    this.setState((prevState) => ({
      editandoEmpresario: {
        ...prevState.editandoEmpresario,
        [name]: value,
      },
    }));
  }

  handleNuevoSubmit(event) {
    event.preventDefault();

    const { nuevoEmpresario } = this.state;

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
        console.log("Error al crear académico:", error);
      }
    );
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
            <h2>Agregar nuevo curso (Empresario)</h2>
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
            {empresarios.map((empresario) => (
              <tr key={empresario.ID}>
                <td>{empresario.ID}</td>
                <td>{empresario.Titulo}</td>
                <td>{empresario.Contenido.substring(0, 100) + "..."}</td>
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
