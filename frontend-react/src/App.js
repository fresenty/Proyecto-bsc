import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./css/Navbar.css";
import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import BoardEmpresario from "./components/BoardEmpresario";
import Visitante from "./components/Visitante";
import BoardAcademico from "./components/BoardAcademico";
import Noticias from "./components/Noticias";
import Criptomonedas from "./components/Coins";
import CrudEmpresario from "./components/CrudEmpresario";
import CrudUsuario from "./components/CrudUsuario";
import CrudNoticias from "./components/CrudNoticias";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      showEmpresarioBoard: false,
      showAcademicoBoard: false,
      currentUser: undefined,
      navbarCollapsed: true,
      activeLink: null, // Nuevo estado para guardar el enlace activo
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.role.includes("admin"),
        showEmpresarioBoard: user.role.includes("empresario"),
        showAcademicoBoard: user.role.includes("academico"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showAdminBoard: false,
      showEmpresarioBoard: false,
      showAcademicoBoard: false,
      currentUser: undefined,
    });
  }

  handleNavLinkClick(index) {
    // Actualizar el enlace activo cuando se hace clic en un título del Navbar
    this.setState({ activeLink: index });
  }

  render() {
    const {
      currentUser,
      showAdminBoard,
      showAcademicoBoard,
      showEmpresarioBoard,
      navbarCollapsed,
      activeLink,
    } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary ">
          <div className="container-fluid">
            <Link to={"/"} className="navbar-brand">
              BSC
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              onClick={() =>
                this.setState((prevState) => ({
                  navbarCollapsed: !prevState.navbarCollapsed,
                }))
              }
            >
              <span className="navbar-toggler-icon "></span>
            </button>
            <div
              className={`collapse navbar-collapse ${
                navbarCollapsed ? "" : "show"
              }`}
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    to={"/home"}
                    className={`nav-link ${
                      activeLink === 0 ? "active" : ""
                    }`}
                    onClick={() => this.handleNavLinkClick(0)}
                  >
                    Inicio
                  </Link>
                </li>
                {!showAcademicoBoard &&
                  !showAdminBoard &&
                  !showEmpresarioBoard && (
                    <li className="nav-item">
                      <Link
                        to={"/visitante"}
                        className={`nav-link ${
                          activeLink === 1 ? "active" : ""
                        }`}
                        onClick={() => this.handleNavLinkClick(1)}
                      >
                        Curso
                      </Link>
                    </li>
                  )}

                {showAdminBoard && (
                  <li className="nav-item">
                    <Link
                      to={"/CrudEmpresario"}
                      className={`nav-link ${
                        activeLink === 2 ? "active" : ""
                      }`}
                      onClick={() => this.handleNavLinkClick(2)}
                    >
                      Cursos
                    </Link>
                  </li>
                )}

                {showEmpresarioBoard && (
                  <li className="nav-item">
                    <Link
                      to={"/empresario"}
                      className={`nav-link ${
                        activeLink === 3 ? "active" : ""
                      }`}
                      onClick={() => this.handleNavLinkClick(3)}
                    >
                      Curso
                    </Link>
                  </li>
                )}

                {showAcademicoBoard && (
                  <li className="nav-item">
                    <Link
                      to={"/academico"}
                      className={`nav-link ${
                        activeLink === 4 ? "active" : ""
                      }`}
                      onClick={() => this.handleNavLinkClick(4)}
                    >
                      Curso
                    </Link>
                  </li>
                )}

                {showAcademicoBoard && (
                  <li className="nav-item">
                    <Link
                      to={"/academico-noticias"}
                      className={`nav-link ${
                        activeLink === 5 ? "active" : ""
                      }`}
                      onClick={() => this.handleNavLinkClick(5)}
                    >
                      Noticias
                    </Link>
                  </li>
                )}
                {showEmpresarioBoard && (
                  <li className="nav-item">
                    <Link
                      to={"/academico-noticias"}
                      className={`nav-link ${
                        activeLink === 6 ? "active" : ""
                      }`}
                      onClick={() => this.handleNavLinkClick(6)}
                    >
                      Noticias
                    </Link>
                  </li>
                )}
                {!showAcademicoBoard &&
                  !showAdminBoard &&
                  !showEmpresarioBoard && (
                    <li className="nav-item">
                      <Link
                        to={"/academico-noticias"}
                        className={`nav-link ${
                          activeLink === 7 ? "active" : ""
                        }`}
                        onClick={() => this.handleNavLinkClick(7)}
                      >
                        Noticias
                      </Link>
                    </li>
                  )}
                {showAcademicoBoard && (
                  <li className="nav-item">
                    <Link
                      to={"/criptomonedas"}
                      className={`nav-link ${
                        activeLink === 8 ? "active" : ""
                      }`}
                      onClick={() => this.handleNavLinkClick(8)}
                    >
                      Criptomonedas
                    </Link>
                  </li>
                )}
                {showEmpresarioBoard && (
                  <li className="nav-item">
                    <Link
                      to={"/criptomonedas"}
                      className={`nav-link ${
                        activeLink === 9 ? "active" : ""
                      }`}
                      onClick={() => this.handleNavLinkClick(9)}
                    >
                      Criptomonedas
                    </Link>
                  </li>
                )}
                {!showAcademicoBoard &&
                  !showAdminBoard &&
                  !showEmpresarioBoard && (
                    <li className="nav-item">
                      <Link
                        to={"/criptomonedas"}
                        className={`nav-link ${
                          activeLink === 10 ? "active" : ""
                        }`}
                        onClick={() => this.handleNavLinkClick(10)}
                      >
                        Criptomonedas
                      </Link>
                    </li>
                  )}

                {showAdminBoard && (
                  <li className="nav-item">
                    <Link
                      to={"/CrudUsuario"}
                      className={`nav-link ${
                        activeLink === 11 ? "active" : ""
                      }`}
                      onClick={() => this.handleNavLinkClick(11)}
                    >
                      Usuarios
                    </Link>
                  </li>
                )}
                {showAdminBoard && (
                  <li className="nav-item">
                    <Link
                      to={"/CrudNoticias"}
                      className={`nav-link ${
                        activeLink === 12 ? "active" : ""
                      }`}
                      onClick={() => this.handleNavLinkClick(12)}
                    >
                      Noticias
                    </Link>
                  </li>
                )}
              </ul>

              {currentUser ? (
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <Link to={"/profile"} className="nav-link">
                      {currentUser.username}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a
                      href="/login"
                      className="nav-link"
                      onClick={this.logOut}
                      style={{ color: "white" }}
                    >
                      Cerrar sesión
                    </a>
                  </li>
                </ul>
              ) : (
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                      Iniciar Sesión
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                      Registrarse
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </nav>

        <div className="container-fluid ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/CrudEmpresario" element={<CrudEmpresario />} />
            <Route path="/empresario" element={<BoardEmpresario />} />
            <Route path="/academico" element={<BoardAcademico />} />
            <Route path="/academico-noticias" element={<Noticias />} />
            <Route path="/criptomonedas" element={<Criptomonedas />} />
            <Route path="/visitante" element={<Visitante />} />
            <Route path="/CrudUsuario" element={<CrudUsuario />} />

            <Route path="/CrudNoticias" element={<CrudNoticias />} />
          </Routes>
        </div>

        <AuthVerify logOut={this.logOut} />
      </div>
    );
  }
}

export default App;
