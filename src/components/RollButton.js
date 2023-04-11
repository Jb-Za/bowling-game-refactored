import React, { Component } from "react";
import "./buttons.css";

class RollButton extends Component {
  handleClick = () => {
    this.props.handleRoll();
  };

  render() {
    return (
      <button className="button" onClick={this.handleClick}>
        Roll Ball
      </button>
    );
  }
}

export default RollButton;
