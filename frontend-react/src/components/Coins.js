import React, { Component } from "react";
import "../css/coins.css";
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
      <div className="home-container col-md-10 offset-md-1">
        <table className="table-responsive-sm table table-ligth table-striped">
          <thead>
            <tr>
              <th>Moneda</th>
              <th>Símbolo</th>
              <th>Precio (USD)</th>
              <th>Última Actualización</th>
            </tr>
          </thead>
          <tbody>
            {content.map((object) => {
              const date = new Date(object.last_updated);
              const formattedDate = date.toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
              return (
                <tr key={object.id}>
                  <td>
                    <img
                      src={object.image}
                      className="rounded-circle"
                      alt={object.name}
                      width="28"
                      height="28"
                    ></img>{" "}
                    {object.name}
                  </td>
                  <td className="col-sm-2">{object.symbol}</td>
                  <td className="col-sm-3">
                    {new Intl.NumberFormat("es-ES", {
                      style: "currency",
                      currency: "USD",
                    }).format(object.current_price)}
                  </td>
                  <td className="col-sm-3">{formattedDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Coins;
