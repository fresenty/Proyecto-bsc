import React, { Component } from "react";
import AcademicosService from "../services/academico.service";
import "../css/Contenido-Academico.css";

class BoardAcademico extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
      selectedContent: null,
      currentIndex: 0,
      progress: 0,
    };
  }

  componentDidMount() {
    AcademicosService.getAllAcademicos().then(
      (response) => {
        console.log("Response:", response);
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        console.log("Error:", error);
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  handleTitleClick = (content, index) => {
    this.setState({ selectedContent: content, currentIndex: index });
  };

  handleCompletedClick = () => {
    const { content, currentIndex } = this.state;
    if (currentIndex < content.data.length - 1) {
      const nextIndex = currentIndex + 1;
      const nextContent = content.data[nextIndex];
      this.setState({
        selectedContent: nextContent.Contenido,
        currentIndex: nextIndex,
        progress: ((nextIndex + 1) / content.data.length) * 100,
      });
      // Llama a la función updateIsComplete para actualizar el campo IsComplete en la base de datos
      AcademicosService.updateIsComplete(nextContent.ID);
    }
  };

  render() {
    const { content, selectedContent, progress } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3 order-md-2">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Contenido del Curso</th>
                </tr>
              </thead>
              <tbody>
                {content.data &&
                  content.data.map((academico, index) => (
                    <tr key={academico.ID}>
                      <td
                        className="boton-lista"
                        onClick={() =>
                          this.handleTitleClick(academico.Contenido, index)
                        }
                      >
                        {academico.Titulo}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="col-md-9 order-md-1">
            <section>
              {selectedContent && (
                <div
                  dangerouslySetInnerHTML={{ __html: selectedContent }}
                ></div>
              )}
            </section>
            {selectedContent && (
              <div className="mt-3">
                <button
                  className="btn btn-primary"
                  onClick={this.handleCompletedClick}
                >
                  Completado
                </button>
                <div className="progress mt-3">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${progress}%` }}
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default BoardAcademico;
