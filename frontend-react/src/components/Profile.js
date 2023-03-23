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

    // const { currentUser } = this.state;
    // console.log(this.state.content);
    const { content } = this.state;
    // console.log(content)

    return (
      <div className="col-md-12">
        <div className="container">
          {this.state.userReady ? (
            <div>
              <h3 style={{ color: "white" }}>
                <strong>Nombre de Usuario: {content.username}</strong>
              </h3>

              <p>
                <strong>Nombre:</strong> {content.firstname} {content.lastname}
              </p>
              <p>
                <strong>Email:</strong> {content.email}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
