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
      back: false,
      next: true,
      finished: false,
    };
  }

  async componentDidMount() {
    await AcademicosService.getAllAcademicos().then(
      (response) => {
        AcademicosService.getInscripcionesbyUserID().then((data) => {
          this.setState({
            progress: data.percent_course,
          });
          if (data.complete < response.data.data.length) {
            this.setState({ finished: false });
          } else {
            this.setState({ finished: true });
          }
          if (data.complete < response.data.data.length - 1){
            response.data.data = response.data.data.slice(0, data.complete + 1);
          }
        });

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

  setButton = (nextIndex) => {
    if (nextIndex === this.state.content.data.length - 1) {
      this.setState({next: true});
    } else {
      this.setState({next: false});
    }
    if (nextIndex === 0) {
      this.setState({ back: true });
    } else {
      this.setState({ back: false });
    }
  }

  handleTitleClick = (content, index) => {
    this.setState({ selectedContent: content, currentIndex: index });
    this.setButton(index);
  };

  handleBackClick = () => {
    const { content, currentIndex } = this.state;
    if (currentIndex > 0) {
      const nextIndex = currentIndex - 1;
      const nextContent = content.data[nextIndex];
      this.setButton(nextIndex);
      this.setState({
        selectedContent: nextContent.Contenido,
        currentIndex: nextIndex,
      });
    }
  };

  handleCompletedClick = async () => {
    const index = this.state.currentIndex;
    const dataLen = this.state.content.data.length -1;
    if (index === dataLen) {
      AcademicosService.updateIsComplete(sessionStorage.getItem("userID"));
      await this.componentDidMount();
    }
    setTimeout(() => {
      const { content, currentIndex } = this.state;
      if (currentIndex < content.data.length - 1) {
        const nextIndex = currentIndex + 1;
        const nextContent = content.data[nextIndex];
        this.setButton(nextIndex);
        this.setState({
          selectedContent: nextContent.Contenido,
          currentIndex: nextIndex,
        });
      }
    }, 300);
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
                  className="btn btn-primary col-md-6"
                  onClick={this.handleBackClick}
                  disabled={this.state.back}
                >
                  Anterior
                </button>
                <button
                  className="btn btn-primary col-md-6"
                  onClick={this.handleCompletedClick}
                  disabled={this.state.next && this.state.finished}
                >
                  {this.state.next ? "Completado" : "Siguiente"}
                </button>
                <div className="progress mt-3">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${progress}%` }}
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    {progress}%
                  </div>
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
