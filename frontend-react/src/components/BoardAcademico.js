import React, { Component } from "react";

// import UserService from "../services/user.service";
// import EventBus from "../common/EventBus";

export default class BoardAcademico extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

 
  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>Hola Academico</h3>
          {/* <h3>{this.state.content}</h3> */}
        </header>
      </div>
    );
  }
}
