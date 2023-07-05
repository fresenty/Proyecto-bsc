import React, { Component } from "react";
import "../css/home.css";
import UserService from "../services/user.service";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      homes: [],
    };
  }

  componentDidMount() {
    Promise.all([UserService.getPublicContent(), UserService.getAllHome()])
      .then((responses) => {
        this.setState({
          content: responses[0].data.message,
          homes: responses[1].data.data,
        });
      })
      .catch((error) => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString(),
          homes:
            (error.response && error.response.data) ||
            error.message ||
            error.toString(),
        });
      });
  }

  render() {
    const { homes } = this.state;
    const home = homes.length > 0 ? homes[0] : {};

    return (
      <div className="container ">
        <div className="row mt-6">
          <div className="col-md-12 text-center">
            <img
              className="rounded-right img-fluid"
              src={`${process.env.REACT_APP_API_IMAGES}${home.image}`}
              alt="imagen de logo"
              style={{ maxWidth: "40%" }}
            />
            <h1 className="display-4" style={{ color: '#10d66d0' }}>{home.title}</h1>
            <p style={{ color: '#1C1537', marginTop: '-30px' }}
              className="lead"
              dangerouslySetInnerHTML={{ __html: home.content }}
            ></p>
          </div>
        </div>

        <div className="row my-6">
          <div className="col-md-12 ">
            <h2 style={{ color: '#1C1537' }}>{home.title2}</h2>
            <p
            
              dangerouslySetInnerHTML={{ __html: home.content2 }}
              style={{ textAlign: "justify", color: '#1C1537' }}
            ></p>
            <div className="video-container">
              <iframe
                width="800"
                height="465"
                src="https://www.youtube.com/embed/V9Kr2SujqHw"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        <div className="row my-6">
          <div className="col-md-6">
            <h2 style={{ color: '#1C1537' }}>{home.title3}</h2>
            <p style={{ color: '#1C1537' }}>{home.content3}</p>
          </div>
          <div className="col-md-6">
            <h2 style={{ color: '#1C1537' }}>{home.title4}</h2>
            <p style={{ color: '#1C1537' }} dangerouslySetInnerHTML={{ __html: home.content4 }}></p>
          </div>
        </div>

        <div className="row my-6">
          <div className="col-md-4">
            <div className="card">
              <img
                src={`${process.env.REACT_APP_API_IMAGES}${home.image2}`}
                className="card-img-top"
                alt="Imagen para usuarios avanzados"
              />
              <div className="card-body">
                <h5 style={{ color: '#1C1537' }} className="card-title">{home.title5}</h5>
                <p style={{ color: '#1C1537' }} className="card-text">{home.content5}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img
                src={`${process.env.REACT_APP_API_IMAGES}${home.image3}`}
                className="card-img-top"
                alt="Imagen para usuarios Academicos"
              />
              <div className="card-body">
                <h5 style={{ color: '#1C1537' }} className="card-title">{home.title6}</h5>
                <p style={{ color: '#1C1537' }} className="card-text">{home.content6}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img
                src={`${process.env.REACT_APP_API_IMAGES}${home.image4}`}
                className="card-img-top"
                alt="Imagen para usuarios Empresarios"
              />
              <div className="card-body">
                <h5 style={{ color: '#1C1537' }} className="card-title">{home.title7}</h5>
                <p style={{ color: '#1C1537' }} className="card-text">{home.content7}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;