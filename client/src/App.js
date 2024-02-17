import React from "react";
import CodeSubmit from "./CodeSubmit";
import Leaderboard from "./leaderboard.js";
import LandingPage from "./landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <CodeSubmit game_name={"filler"} /> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Leaderboard" element={<Leaderboard />} />
          <Route
            path="/Connect4CodeSubmit"
            element={<CodeSubmit game_name={"connect4"} />}
          />
          <Route
            path="/TronCodeSubmit"
            element={<CodeSubmit game_name={"tron"} />}
          />
          <Route
            path="/RPSCodeSubmit"
            element={<CodeSubmit game_name={"rps"} />}
          />
          <Route
            path="/FillerCodeSubmit"
            element={<CodeSubmit game_name={"filler"} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
