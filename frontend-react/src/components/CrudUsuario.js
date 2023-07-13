import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserService from "../services/user.service";
import "../css/crud.css";

class CrudUsuario extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usuarios: [],
      editandoUsuario: null,
      tiposDeUsuario: {
        1: "Académico",
        2: "Empresario",
        3: "Administrador",
      },
    };

    this.handleEliminarClick = this.handleEliminarClick.bind(this);
    this.handleEditarClick = this.handleEditarClick.bind(this);
    this.handleEditarSubmit = this.handleEditarSubmit.bind(this);
    this.handleEditarChange = this.handleEditarChange.bind(this);
  }

  componentDidMount() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    UserService.getAllUsuarios()
      .then((response) => {
        const { data } = response.data;
        if (Array.isArray(data)) {
          this.setState({
            usuarios: data,
          });
        } else {
          console.log("La respuesta no es un array válido:", data);
          this.setState({
            usuarios: [],
          });
        }
      })
      .catch((error) => {
        console.log("Error al obtener usuarios:", error);
        this.setState({
          usuarios: [],
        });
      });
  }

  handleEliminarClick(id) {
    if (window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      UserService.deleteUsuario(id)
        .then(() => {
          this.cargarUsuarios();
          toast.success("Se ha eliminado el usuario con éxito");
        })
        .catch((error) => {
          console.log("Error al eliminar usuario:", error);
        });
    }
  }

  handleEditarClick(usuario) {
    this.setState({
      editandoUsuario: { ...usuario },
    });
  }

  handleEditarSubmit(event) {
    event.preventDefault();

    const { editandoUsuario } = this.state;

    UserService.updateUsuarioByID(editandoUsuario.ID, editandoUsuario)
      .then(() => {
        this.cargarUsuarios();
        this.setState({
          editandoUsuario: null,
        });
        toast.success("Se ha actualizado el usuario con éxito");
      })
      .catch((error) => {
        console.log("Error al actualizar usuario:", error);
      });
  }

  handleEditarChange(event) {
    const { name, value } = event.target;

    this.setState((prevState) => ({
      editandoUsuario: {
        ...prevState.editandoUsuario,
        [name]: value,
      },
    }));
  }

  render() {
    const { usuarios, editandoUsuario, tiposDeUsuario } = this.state;

    let usuariosRenderizados;
    if (Array.isArray(usuarios) && usuarios.length > 0) {
      usuariosRenderizados = usuarios.map((usuario) => (
        <tr key={usuario.ID}>
          <td>{usuario.ID}</td>
          <td>{usuario.username}</td>
          <td>{usuario.firstname}</td>
          <td>{usuario.lastname}</td>
          <td>{tiposDeUsuario[usuario.user_type_id]}</td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => this.handleEliminarClick(usuario.ID)}
            >
              Eliminar
            </button>{" "}
            <button
              className="btn btn-warning"
              onClick={() => this.handleEditarClick(usuario)}
            >
              Editar
            </button>
          </td>
        </tr>
      ));
    } else {
      usuariosRenderizados = (
        <tr>
          <td colSpan="6">No se encontraron usuarios.</td>
        </tr>
      );
    }

    return (
      <div className="container-fluid mt-4 col-md-10 offset-md-1">
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre de usuario</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellidos</th>
                <th scope="col">Tipo de usuario</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>{usuariosRenderizados}</tbody>
          </table>
        </div>

        {editandoUsuario && (
          <div className="modal-overlay">
            <div className="modal show d-block" id="editarModal">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <form onSubmit={this.handleEditarSubmit}>
                    <div className="modal-header">
                      <h5 className="modal-title">Editar Usuario</h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={() =>
                          this.setState({ editandoUsuario: null })
                        }
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="form-group">
                        <label htmlFor="username">Nombre de usuario</label>
                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          name="username"
                          value={editandoUsuario.username}
                          onChange={this.handleEditarChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="firstname">Nombre</label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstname"
                          name="firstname"
                          value={editandoUsuario.firstname}
                          onChange={this.handleEditarChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="lastname">Apellido</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastname"
                          name="lastname"
                          value={editandoUsuario.lastname}
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
                          this.setState({ editandoUsuario: null })
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

export default CrudUsuario;
