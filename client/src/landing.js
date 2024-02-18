import React from "react";
import GameCard from "./GameCard";
import { Box, Typography } from "@mui/material";
import Leaderboard from "./leaderboard.js";
import "./landing.css"; // Import the CSS file
import GameView from "./GameView.js";

function LandingPage() {
  return (
    <Box padding={2} className="landingPage">
      <Box bgcolor="white" padding={2} marginBottom={2}>
        <Typography variant="h3" color="black">
          brAIn rot
        </Typography>
      </Box>
      <GameView game_name={'filler'} player1={'filler_random'} player2={'filler_random'} />
      <div className="container">
        <div className="cardContainer">
          <GameCard game_name={"Connect4"} />
          <GameCard game_name={"Rock, Paper, Scissors!"} />
          <GameCard game_name={"Filler"} />
          <GameCard game_name={"Tron"} />
        </div>
        <div className="leaderboardContainer">
          <Leaderboard />
        </div>
      </div>
    </Box>
  );
}

export default LandingPage;
