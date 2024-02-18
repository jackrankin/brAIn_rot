import React from "react";
import GameCard from "./GameCard";
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
    <Box padding={2}>
      <Typography variant="h1">brAIn rot</Typography>
      <div class="cardContainer">
        <GameCard game_name={"Connect4"} />
        <GameCard game_name={"Rock, Paper, Scissors!"} />
        <GameCard game_name={"Filler"} />
        <GameCard game_name={"Tron"} />
      </div>
    </Box>
  );
}

export default LandingPage;
