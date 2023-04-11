import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import Scoreboard from "./components/Scoreboard.js";
import Game from "./Game.js";
import registerServiceWorker from "./registerServiceWorker";
import BowlingAlley from "./components/bowlingAlley";
import RollButton from "./components/RollButton";
import ResetButton from "./components/ResetButton";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: [],
    };
    this.bowlingAlleyRef = React.createRef();
    this.game = Game.create(this.bowlingAlleyRef);
  }

  handleRoll = () => {
    this.game.simulatePlayer();

    this.setState({ scores: this.game.score() });
  };

  handleReset = () => {
    this.game.reset();

    this.setState({ scores: this.game.score() });
  };

  render() {
    const { scores } = this.state;

    return (
      <div className="container">
        <Scoreboard scores={scores} />

        <div class="bowling-alley-container">
          <BowlingAlley ref={this.bowlingAlleyRef} />
        </div>

        <div className="buttons">
          <RollButton handleRoll={this.handleRoll} />
          <ResetButton handleReset={this.handleReset} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
