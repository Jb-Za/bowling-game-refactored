//import ScoreBoard from "./components/Scoreboard.js";
import React, { Component } from "react";
//import App from "./index.js";

import BowlingAlley from "./components/bowlingAlley.js";

class Game {
  constructor() {
    this.bowlingAlley = new BowlingAlley();
    this.rolls = [];
    this.currentRoll = 0;
    this.frame = 1;
    this.withinFrame = 1;
    this.pinsup = 10;
    this.extraBall = false;
  }

  static create = () => new Game();

  roll = (pins) => {
    this.rolls[this.currentRoll++] = pins;
    //console.log(pins);
  };

  reset = () => {
    this.rolls = [];
    this.currentRoll = 0;
    this.frame = 1;
    this.withinFrame = 1;
    this.extraBall = false;
    BowlingAlley.resetPins();
  };

  pinsUp = () => {
    const scoreData = this.score();
    let pinsUp = 10;
    scoreData.forEach((o) => {
      if (o.pinsUp !== null && !isNaN(o.pinsUp)) {
        pinsUp = o.pinsUp;
      }
    });
    return pinsUp;
  };

  simulatePlayer = async () => {
    if (this.frame > 10) {
      return;
    }

    if (this.withinFrame === 1) {
      BowlingAlley.resetPins();
    }

    let roll = Math.floor(Math.random() * (this.pinsUp() + 1)); // roll first ball

    if (this.frame === 10) {
      this.handleTenthFrame(roll);
    } else {
      this.handleNormalFrame(roll);
    }
  };

  handleTenthFrame = (roll) => {
    this.pinsup = this.pinsUp() - roll;
    BowlingAlley.rollBall(this.pinsup);
    this.roll(roll); // feed roll value to game instance

    if (this.withinFrame === 1 && roll === 10) {
      // if roll 1 is a strike, get two more rolls
      this.pinsup = 10;
      this.extraBall = true;
      this.withinFrame++;
    } else if (this.withinFrame === 2) {
      if (this.pinsUp() - roll === 0) {
        this.extraBall = true;
      }
      this.withinFrame++;
    } else if (this.withinFrame === 3) {
      this.frame++;
      this.withinFrame = 1;
    } else {
      this.pinsup = this.pinsUp() - roll;
      this.withinFrame++;
    }
  };

  handleNormalFrame = (roll) => {
    this.pinsup = this.pinsUp() - roll;
    BowlingAlley.rollBall(this.pinsup);
    this.roll(roll); // feed roll value to game instance

    if (roll === 10 && this.withinFrame === 1) {
      // if roll is a strike
      this.withinFrame = 1;
      this.frame++;
    } else if (this.pinsUp() === 0 || this.withinFrame === 2) {
      this.withinFrame = 1;
      this.frame++;
    } else {
      this.withinFrame++;
    }
  };

  score = () => {
    let scoreData = [];
    let score = 0;
    let frameIndex = 0;

    const roll1 = () => this.rolls[frameIndex];
    const roll2 = () => this.rolls[frameIndex + 1];
    const roll3 = () => this.rolls[frameIndex + 2];

    const sumOfFrameRolls = () => roll1() + roll2();

    const spareBonus = () => roll3();

    const strikeBonus = () => roll2() + roll3();

    const isStrike = () => roll1() === 10;

    const isSpare = () => sumOfFrameRolls() === 10;

    const saveFrame = (scoreData, leftBox, rightBox, score, pinsUp) => {
      if (scoreData.length < 9) {
        scoreData.push({
          leftBox,
          rightBox,
          cumulativeScore: score,
          pinsUp,
        });
      } else {
        const box1 = roll1() === 10 ? "X" : roll1();
        const box2 = roll2() === 10 ? "X" : isSpare() ? "/" : roll2();
        let box3;
        if (roll3() === 10) {
          box3 = "X";
        } else if (roll1() === 10 || roll1() + roll2() === 10) {
          box3 = roll3();
        } else {
          box3 = "";
        }

        scoreData.push({
          leftBox: box1,
          rightBox: box2,
          cumulativeScore: score,
          pinsUp,
          extraBox: box3,
        });
      }
    };

    [...Array(10)].forEach((_, frame) => {
      if (isStrike()) {
        score += 10 + strikeBonus();
        saveFrame(scoreData, "", "X", score, 10);
        frameIndex++;
      } else if (isSpare()) {
        score += 10 + spareBonus();
        saveFrame(scoreData, roll1(), "/", score, 10);
        frameIndex += 2;
      } else {
        score += sumOfFrameRolls();
        const pinsUp = roll2() !== undefined ? 10 : 10 - roll1();
        saveFrame(scoreData, roll1(), roll2(), score, pinsUp);
        frameIndex += 2;
      }
    });

    return scoreData;
  };
}

export default Game;
