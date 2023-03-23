import React, { Component } from "react";
import "../css/home.css";
import logo from "../img/bsc-logo.png";
import UserService from "../services/user.service";

import user1Img from '../img/user1.png';
import user2Img from '../img/user2.png';
import user3Img from '../img/user3.png';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data.message
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="home-container">
          
        <div className="row mt-6">
  <div className="col-md-12 text-center">
    <img className="rounded-right img-fluid" src={logo} alt="imagen de logo" style={{ maxWidth: "400px" }} />
  </div>
  <div className="container">
            <h1 className="display-4"style={{ textAlign:"center" }}>Blockchain Study Center</h1>
            <p className="lead"style={{ textAlign:"center" }}>Aprende todo sobre blockchain en BSC - Blockchain Study Center</p>    
        </div>
</div>
          <h2>¿Qué es BSC?</h2>
            <p>
            ¡Bienvenidos a nuestro sitio web! Aquí encontrarás información verídica y de carácter
            educativo sobre la tecnología DLT y Blockchain.<div class="mb-2"></div>

            Nuestro objetivo es promover la cultura de la ciberseguridad y confianza digital en la
            región, a través de la enseñanza de estas tecnologías. Como sabemos que el tema puede
            ser un tanto desconocido para la comunidad, hemos creado contenido multimedia como animaciones 
            y entrevistas a personal académico, empresarios, industria, gobierno, entre otros, para hacer
            comprender los conceptos de manera más clara y amigable.<div class="mb-2"></div>

            En nuestro sitio web podrás encontrar todo lo que necesitas saber sobre DLT y Blockchain, desde 
            lo más básico hasta lo más avanzado. Además, abordamos las diferencias individuales en los procesos
             de aprendizaje y compatibilizamos esto con los mecanismos de acreditación utilizados en los sistemas
              educativos de hoy, para que puedas aprender de la manera que más te acomode.<div class="mb-2"></div>

            Sabemos que en la región existe temor y desconocimiento sobre las herramientas web, ya que están son un
            tanto difamadas o comparadas con algunas modalidades de robo que se presentan a lo largo del país. 
            Por eso, en nuestro sitio web también encontrarás información y consejos sobre ciberseguridad, para 
            que puedas navegar la web de manera segura y confiable.<div class="mb-2"></div>

            ¡Explora nuestro sitio web y comienza a aprender sobre DLT y Blockchain de manera fácil y entretenida!<div class="mb-2"></div>
            </p>
            <div class="text-center">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/V9Kr2SujqHw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>        <div className="container my-6">
          <div className="row">
            <div className="col-md-6">
              <h2 className="mb-4">¿Por qué aprender blockchain en BSC?</h2>
              <p>
              En BSC, ofrecemos una ruta de aprendizaje clara y progresiva, 
              diseñada para que puedas adquirir conocimientos desde cero o 
              para aquellos que ya tienen experiencia previa en el campo.
              </p>
            </div>
            <div className="col-md-6">
              <h2 className="mb-4">¿Qué ofrecemos?</h2>
              <ul>
              <li>Introducción a blockchain</li>
              <li>Desarrollo de contratos inteligentes</li>
              <li>Seguridad en blockchain</li>
              <li>Aplicaciones descentralizadas (dApps)</li>
              <li>Y más...</li>
            </ul>
            </div>
          </div>
          <div class="container my-6">
          <h2 className="mb-4">Tipos de usuarios</h2>
  <div class="row">
  
  <div class="col-md-4">
  <div class="card">
  <img src={user1Img} class="card-img-top" alt="Imagen para usuarios avanzados"/>
    <div class="card-body">
      <h5 class="card-title">Visitante</h5>
      <p class="card-text">se refiere a una persona que accede a la plataforma
              sin necesidad de registrarse o autenticarse. Por lo general,
              este tipo de usuario tiene acceso limitado a las funcionalidades y contenido 
              de la plataforma, y no puede interactuar con otros usuarios.</p>
    </div>
  </div>
</div>
<div class="col-md-4">
  <div class="card">
  <img src={user2Img} class="card-img-top" alt="Imagen para usuarios avanzados"/>
    <div class="card-body">
      <h5 class="card-title">Académico</h5>
      <p class="card-text"> Se refiere a una persona que está interesada en
              aprender sobre un tema específico y busca una plataforma educativa
              para hacerlo. En este caso, el usuario académico puede tener acceso
              a contenido exclusivo, tareas y evaluaciones para medir su progreso,
              y la posibilidad de interactuar con otros usuarios para discutir sobre
              el tema en cuestión.</p>
    </div>
  </div>
</div>
<div class="col-md-4">
  <div class="card">
    <img src={user3Img} class="card-img-top" alt="Imagen para usuarios avanzados"/>
    <div class="card-body">
      <h5 class="card-title">Empresarios</h5>
      <p class="card-text">Se refiere a una persona que representa a una empresa
              o institución y busca una plataforma para ofrecer capacitación y formación a
              sus empleados o miembros. En este caso, el usuario empresarial puede tener acceso
              a herramientas de seguimiento del progreso de sus empleados, informes y estadísticas 
              sobre el rendimiento y la eficacia de la formación, y la posibilidad de personalizar 
              el contenido y las evaluaciones para adaptarse a las necesidades de su organización..</p>
    </div>
  </div>
</div>
  </div>
</div>
        </div>
      </div>
    );
  }
}

export default Home;