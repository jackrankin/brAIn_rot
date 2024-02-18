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
      <GameView game_name={'connect4'} player1={'connect4_random'} player2={'connect4_random'} />
      <div className="container">
        <div className="cardContainer">
          <GameCard game_name={"Connect4"} />
          <GameCard game_name={"Rock, Paper, Scissors!"} />
          <GameCard game_name={"Filler"} />
          <GameCard game_name={"Tron"} />
        </div>
        <div className="leaderboardContainer">
          <Leaderboard rows={[{name: 'me', value: '2'}, {name: 'mesfsf', value: '23'}, {name: 'mesfsf', value: '3'}]} game={'connect4'}/>
          <Leaderboard rows={[{name: 'me', value: '2'}, {name: 'mesfsf', value: '23'}, {name: 'mesfsf', value: '3'}]} game={'rockpaperscissors'}/>
          <Leaderboard rows={[{name: 'me', value: '2'}, {name: 'mesfsf', value: '23'}, {name: 'mesfsf', value: '3'}]} game={'filler'}/>
        </div>
      </div>
    </Box>
  );
}

export default LandingPage;
