import React, { Component } from "react";
import VisitantesService from "../services/visitante.service";
import "../css/Contenido-Academico.css";

class Visitante extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: { data: [] },
      selectedContent: null,
      currentIndex: 0,
      progress: 0,
    };
  }

  componentDidMount() {
    VisitantesService.getAllVisitantes().then(
      (response) => {
        console.log("Response:", response);
        const sortedContent = response.data.data.sort((a, b) => a.ID - b.ID);
        this.setState({
          content: { data: sortedContent },
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

  handleBackClick = () => {
    const { content, currentIndex } = this.state;
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      const prevContent = content.data[prevIndex];
      this.setState({
        selectedContent: prevContent.Contenido,
        currentIndex: prevIndex,
        progress: ((prevIndex + 1) / content.data.length) * 100,
      });
    }
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
    }
  };

  render() {
    const { content, selectedContent, currentIndex } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3 order-md-2">
          
            <div className="list-group">
            <h5 className=" text-center">Contenido del Curso</h5>
              {content.data &&
                content.data.map((visitante, index) => (
                  <button
                    key={visitante.ID}
                    type="button"
                    className={`list-group-item list-group-item-action ${
                      index === currentIndex ? "active" : ""
                    }`}
                    onClick={() =>
                      this.handleTitleClick(visitante.Contenido, index)
                    }
                  >
                    {visitante.Titulo}
                  </button>
                ))}
            </div>
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
              <div className="mt-3 d-flex justify-content-center">
                <button
                  className={`btn mx-4 ${
                    currentIndex === 0 ? "btn-outline-secondary" : "btn-primary"
                  }`}
                  onClick={this.handleBackClick}
                  disabled={currentIndex === 0}
                >
                  Atrás
                </button>
                <button
                  className={`btn mx-4 ${
                    currentIndex === content.data.length - 1
                      ? "btn-outline-secondary"
                      : "btn-primary"
                  }`}
                  onClick={this.handleCompletedClick}
                  disabled={currentIndex === content.data.length - 1}
                >
                  Adelante
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}  

export default Visitante;
