import React, { Component } from "react";
import "../css/home.css";
import CoinsService from "../services/coins.service";

class Coins extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
    };
  }

  componentDidMount() {
    CoinsService.getCoins().then(
      (response) => {
        console.log(response.data);
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  render() {
    const { content } = this.state;
    console.log(content);
    return (
      <div className="home-container">
        <table className="table-responsive-sm table table-ligth table-striped" style={{ color: "black" }}>
          <thead>
            <tr>
              <th>Moneda</th>
              <th>Símbolo</th>
              <th>Precio (USD)</th>
              <th>Ultima Actualización</th>
            </tr>
          </thead>
          <tbody>
            {content.map((object) => (
              <tr key={object.id}>
                <td><img src={object.image} className="rounded-circle" alt={object.name} width="28" height="28"></img>   {object.name}</td>
                <td className="col-sm-2">{object.symbol}</td>
                <td className="col-sm-3">{object.current_price}</td>
                <td className="col-sm-3">{object.last_updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Coins;
