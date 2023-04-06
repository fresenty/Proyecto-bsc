import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
      content: {},
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true });

    UserService.getUserBoard(currentUser.id).then(
      (response) => {
        this.setState({
          content: response.data.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data.data &&
              error.response.data.data.message) ||
            error.message ||
            error.toString(),
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }

    const { content } = this.state;
    return (
      <div className="col-md-12">
        <div className="container">
          {this.state.userReady ? (
            <div className="card">
              <div className="card-header bg-dark text-white">
                <h3 className="card-title">
                  <strong>Apodo: {content.username}</strong>
                </h3>
              </div>
              <div className="card-body">
                <p>
                  <strong>Nombre:</strong> {content.firstname} {content.lastname}
                </p>
                <p>
                  <strong>Email:</strong> {content.email}
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
