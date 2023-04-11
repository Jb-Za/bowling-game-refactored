import React from "react";
import { shallow } from "enzyme";
import ScoreBoard from "./Scoreboard.js";

import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

jest.mock("./bowlingAlley");

describe("ScoreBoard", () => {
  it("renders without crashing", () => {
    const scores = [
      { leftBox: 1, rightBox: 2, extraBox: undefined, cumulativeScore: 3 },
      { leftBox: 3, rightBox: 4, extraBox: undefined, cumulativeScore: 7 },
    ];
    shallow(<ScoreBoard scores={scores} />);
  });
});
