import React, { Component } from "react";

class ShowTable extends Component {
  state = {
    contacts: [],
    data: [],
  };

  componentDidMount() {
    const apiUrl = "https://api.binance.com/api/v1/ticker/price?symbol=LTCBTC";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => this.setState({ contacts: data }))
      .catch(console.log);
  }

  render() {
    const { contacts, rows } = this.state;
    return (
      <div>
        <p>{contacts.price}</p>
      </div>
    );
  }
}
export default ShowTable;
