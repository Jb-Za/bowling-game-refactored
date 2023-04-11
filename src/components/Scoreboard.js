import "./Scoreboard.css";
import React, { Component } from "react";
import Game from "../Game.js";
import EasyEdit, { Types } from "react-easy-edit";
import PropTypes from "prop-types";
//I pulled and edited most of this component from https://github.com/dearfrankg/react-bowling

const Frame = ({ frameNumber, leftBox, rightBox, extraBox, score }) => (
  <div className="frame">
    <div className="frame-number">{frameNumber}</div>
    <div className="frame-score">
      <div className="box left">{leftBox}</div>
      <div className="box right">{rightBox}</div>
      <div className="box extra">{extraBox}</div>
    </div>
    <div className="running-score">{!isNaN(score) && score}</div>
  </div>
);

class ScoreBoard extends Component {
  render() {
    const { scores } = this.props;

    const save = (value) => {
      //alert(value);  // these are annoying to be honest
    };

    const cancel = () => {
      //alert("Cancelled");
    };

    return (
      <div>
        <br />
        <div className="player-name">
          <EasyEdit
            type={Types.TEXT}
            onSave={save}
            onCancel={cancel}
            saveButtonLabel="Save"
            cancelButtonLabel="Cancel"
            instructions="Enter player name"
          />
        </div>

        <div className="score-board">
          {[...Array(10)].map((o, i) => (
            <Frame
              key={i}
              frameNumber={i + 1}
              leftBox={scores[i]?.leftBox}
              rightBox={scores[i]?.rightBox}
              extraBox={scores[i]?.extraBox}
              score={scores[i]?.cumulativeScore}
            />
          ))}
        </div>
      </div>
    );
  }
}

ScoreBoard.propTypes = {
  scores: PropTypes.array.isRequired,
};

export default ScoreBoard;
