import React, { Component } from "react";

class RollButton extends Component {
  handleClick = () => {
    this.props.handleRoll();
  };

  render() {
    return (
      <button onClick={this.handleClick}>
        Roll Ball
      </button>
    );
  }
}

export default RollButton;
