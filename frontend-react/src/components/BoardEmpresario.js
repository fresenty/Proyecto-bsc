import React, { Component } from "react";
import empresariosService from "../services/empresario.service";
import "../css/Contenido-Academico.css";

class Boardempresario extends Component {
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
      loading: false,
    };
  }

  async componentDidMount() {
    await empresariosService.getAllempresarios().then(
      (response) => {
        empresariosService.getInscripcionesbyUserID().then((data) => {
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
      this.setState({ next: true });
    } else {
      this.setState({ next: false });
    }
    if (nextIndex === 0) {
      this.setState({ back: true });
    } else {
      this.setState({ back: false });
    }
  };

  handleTitleClick = (content, index) => {
    this.setState({ selectedContent: null, currentIndex: index, loading: true });
    setTimeout(() => {
      this.setState({ selectedContent: content, loading: false }, () => {
        this.setButton(index);
      });
    }, 500);
  };

  handleBackClick = () => {
    const { content, currentIndex } = this.state;
    if (currentIndex > 0) {
      const nextIndex = currentIndex - 1;
      const nextContent = content.data[nextIndex];
      this.setButton(nextIndex);
      this.setState({
        selectedContent: null,
        currentIndex: nextIndex,
        loading: true
      });
      setTimeout(() => {
        this.setState({ selectedContent: nextContent.Contenido, loading: false });
      }, 500);
    }
  };

  handleCompletedClick = async () => {
    const index = this.state.currentIndex;
    const dataLen = this.state.content.data.length - 1;
    if (index === dataLen) {
      empresariosService.updateIsComplete(sessionStorage.getItem("userID"));
      await this.componentDidMount();
    }
    setTimeout(() => {
      const { content, currentIndex } = this.state;
      if (currentIndex < content.data.length - 1) {
        const nextIndex = currentIndex + 1;
        const nextContent = content.data[nextIndex];
        this.setButton(nextIndex);
        this.setState({
          selectedContent: null,
          currentIndex: nextIndex,
          loading: true
        });
        setTimeout(() => {
          this.setState({ selectedContent: nextContent.Contenido, loading: false });
        }, 500);
      }
    }, 300);
  };

  render() {
    const { content, selectedContent, progress, loading } = this.state;
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
                  content.data.map((empresario, index) => (
                    <tr key={empresario.ID}>
                      <td
                        className="boton-lista"
                        onClick={() =>
                          this.handleTitleClick(empresario.Contenido, index)
                        }
                      >
                        {empresario.Titulo}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="col-md-9 order-md-1">
            <section>
              {loading ? (
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                </div>
              ) : (
                selectedContent && (
                  <div dangerouslySetInnerHTML={{ __html: selectedContent }}></div>
                )
              )}
            </section>
            {selectedContent && (
              <div className="mt-3">
                <div className="d-flex">
                  <button
                    className="btn btn-primary flex-grow-1 me-2"
                    onClick={this.handleBackClick}
                    disabled={this.state.back}
                  >
                    Anterior
                  </button>
                  <button
                    className="btn btn-primary flex-grow-1"
                    onClick={this.handleCompletedClick}
                    disabled={this.state.next && this.state.finished}
                  >
                    {this.state.next ? "Completado" : "Siguiente"}
                  </button>
                </div>
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

export default Boardempresario;
