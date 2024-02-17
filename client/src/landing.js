import React from "react";
import GameCard from "./gameCards/GameCard";
import { Box, Grid, Typography } from "@mui/material";
import "./landing.css"; // Import the CSS file

const users = [
  {
    botname: "dylan",
    points: 50,
  },
  {
    botname: "drew",
    points: 100,
  },
  {
    botname: "chaitra",
    points: 10,
  },
  {
    botname: "jack",
    points: 0,
  },
];
function LandingPage() {
  return (
    <Box>
      <Typography variant="h1" component="h2">
        Leaping Lizards
      </Typography>
      <div class="cardContainer">
        <GameCard game_name={"Connect4"} />
        <GameCard game_name={"RockPaperScissors"} />
        <GameCard game_name={"Filler"} />
        <GameCard game_name={"Tron"} />
      </div>
    </Box>
  );
}

export default LandingPage;
