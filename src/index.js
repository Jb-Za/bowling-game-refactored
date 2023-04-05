import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import Scoreboard from "./components/Scoreboard.js";
import Game from "./Game.js";
import registerServiceWorker from "./registerServiceWorker";
import BowlingAlley from "./components/bowlingAlley";
import RollButton from "./components/RollButton";

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

  render() {
    const { scores } = this.state;

    return (
      <div>
        <Scoreboard scores={scores} />

        <div className="bowlingAlley">
          <BowlingAlley ref={this.bowlingAlleyRef} />
        </div>
        
        <RollButton handleRoll={this.handleRoll} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();