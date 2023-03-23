import React, { Component } from "react";
import costru from '../img/costruc.png';


export default class BoardAcademico extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

 
  render() {
    return (
        <div className="col-md-12 text-center">
        <img className="rounded-right img-fluid" src={costru} alt="imagen de costru" style={{ maxWidth: "8700px" }} />
      </div>
    );
  }
}
