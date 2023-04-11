import React, { Component } from "react";
import "./buttons.css";

class ResetButton extends Component {
  handleClick = () => {
    this.props.handleReset();
  };

  render() {
    return (
      <button className="button" onClick={this.handleClick}>
        Reset
      </button>
    );
  }
}

export default ResetButton;
