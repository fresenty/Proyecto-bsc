import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Navbar-cards.css";
import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import BoardAdmin from "./components/BoardAdmin";
import BoardEmpresario from "./components/BoardEmpresario";
import BoardAcademico from "./components/BoardAcademico";
import Noticias from "./components/Noticias";
import Criptomonedas from "./components/Coins";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      showEmpresarioBoard: false,
      showAcademicoBoard: false,
      currentUser: undefined,
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

  render() {
    const {
      currentUser,
      showAdminBoard,
      showAcademicoBoard,
      showEmpresarioBoard,
    } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
          <div className="container-fluid">
            <Link to={"/"} className="navbar-brand">
              BSC
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon "></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    to={"/home"}
                    className="nav-link"
                    style={{ color: "white" }}
                  >
                    Inicio
                  </Link>
                </li>

                {!currentUser && (
                  <li className="nav-item">
                    <Link
                      to={"/home"}
                      className="nav-link"
                      style={{ color: "white" }}
                    >
                      Publico general
                    </Link>
                  </li>
                )}

                {showAdminBoard && (
                  <li className="nav-item">
                    <Link to={"/admin"} className="nav-link">
                      Admin Board
                    </Link>
                  </li>
                )}

                {showEmpresarioBoard && (
                  <li className="nav-item">
                    <Link to={"/empresario"} className="nav-link">
                      Empresario Board
                    </Link>
                  </li>
                )}

                {showAcademicoBoard && (
                  <li className="nav-item">
                    <Link to={"/academico"} className="nav-link">
                      Academico Board
                    </Link>
                  </li>
                )}

                {showAcademicoBoard && (
                  <li className="nav-item">
                    <Link to={"/academico-noticias"} className="nav-link">
                      Noticias
                    </Link>
                  </li>
                )}

                {showAcademicoBoard && (
                  <li className="nav-item">
                    <Link to={"/criptomonedas"} className="nav-link">
                      Criptomonedas
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

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<BoardAdmin />} />
            <Route path="/empresario" element={<BoardEmpresario />} />
            <Route path="/academico" element={<BoardAcademico />} />
            <Route path="/academico-noticias" element={<Noticias />} />
            <Route path="/criptomonedas" element={<Criptomonedas />} />
          </Routes>
        </div>

        <AuthVerify logOut={this.logOut} />
      </div>
    );
  }
}

export default App;
