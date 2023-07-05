import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-select";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import avatar from "../img/bsc-logo.png";
import "../css/Register.css";
import AuthService from "../services/auth.service";
import RoleService from "../services/role.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vfirstname = (value) => {
  if (value.length < 2 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The firstname must be between 3 and 20 characters.
      </div>
    );
  }
};

const vlastname = (value) => {
  if (value.length < 2 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The lastname must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 8 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 8 and 40 characters.
      </div>
    );
  }
};

const vrole = (value) => {
  if (value.length < 2) {
    return (
      <div className="alert alert-danger" role="alert">
        The role must be selected.
      </div>
    );
  }
};

const roles = [
  { value: 1, label: "Academico" },
  { value: 2, label: "Empresario" },
];

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      role: undefined,
      successful: false,
      message: "",
      redirect: null,
      roles: 0,
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeFirstName(e) {
    this.setState({
      firstname: e.target.value,
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastname: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeRole(e) {
    // console.log(e.value)
    this.setState({
      role: e.value,
    });

    // console.log(this.state.role)
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      console.log("de nuevo");
      console.log(this.state.role);
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password,
        this.state.firstname,
        this.state.lastname,
        this.state.role
      ).then(
        (response) => {
          this.setState({
            message: response.data.message,
            successful: true,
            loading: false,
          });
        },

        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage,
          });
        }
      );
    }
  }

  componentDidMount() {
    RoleService.getRoles().then(
      (response) => {
        console.log(response);
        console.log(response.data.data);
        this.setState({
          roles: response.data.data,
        });
      },
      (error) => {
        this.setState({
          roles:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  render() {
    return (
      <div className="col-md-6 mx-auto">
        <div className="card card-container">
          <img
            src={avatar}
            alt="profile-img"
            className="profile-img-card"
          />
  
          {!this.state.successful && (
            <Form
              onSubmit={this.handleRegister}
              ref={(c) => {
                this.form = c;
              }}
            >
              <div className="form-group">
                <label htmlFor="username">Nombre de usuario</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="firstname">Primer nombre</label>
                <Input
                  type="text"
                  className="form-control"
                  name="firstname"
                  value={this.state.firstname}
                  onChange={this.onChangeFirstName}
                  validations={[required, vfirstname]}
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="lastname">Primer Apellido</label>
                <Input
                  type="text"
                  className="form-control"
                  name="lastname"
                  value={this.state.lastname}
                  onChange={this.onChangeLastName}
                  validations={[required, vlastname]}
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  validations={[required, email]}
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>
  
              <div className="form-group">
                <label className="" htmlFor="group_name">
                  Rol de usuario
                </label>
                <Select
                  options={roles}
                  onChange={this.onChangeRole}
                  validations={[required, vrole]}
                  className="form-control"
                />
              </div>
  
              <div className="form-group">
                <button
                  className="btn btn-primary btn-block"
                  style={{ backgroundColor: "#0d66d0" }}
                >
                  Registrarse
                </button>
              </div>
  
              {this.state.message && (
                <div className="form-group">
                  <div
                    className={
                      this.state.successful
                        ? "alert alert-success"
                        : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {this.state.message}
                  </div>
                </div>
              )}
  
              <CheckButton
                style={{ display: "none" }}
                ref={(c) => {
                  this.checkBtn = c;
                }}
              />
            </Form>
          )}
  
          {this.state.successful && (
            <div className="alert alert-success" role="alert">
              Registro exitoso. Por favor, inicie sesión.
            </div>
          )}
        </div>
      </div>
    );
  }
}  
