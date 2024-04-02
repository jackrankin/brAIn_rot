import React from "react";
import GameCard from "./GameCard";
import Leaderboard from "./leaderboard.js";
import { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Rick from "./rick.js";
import "./App.css";
import "./landing.css";

function LandingPage() {
  const [currentLeaderboardIndex, setCurrentLeaderboardIndex] = useState(0);
  const [nextCount, setNextCount] = useState(0);

  const leaderboards = [
    {
      game: "connect4",
      rows: [
        { name: "me", value: "2" },
        { name: "mesfsf", value: "23" },
        { name: "mesfsf", value: "3" },
      ],
    },
    {
      game: "rockpaperscissors",
      rows: [
        { name: "me", value: "2" },
        { name: "mesfsf", value: "23" },
        { name: "mesfsf", value: "3" },
      ],
    },
    {
      game: "filler",
      rows: [
        { name: "me", value: "2" },
        { name: "mesfsf", value: "23" },
        { name: "mesfsf", value: "3" },
      ],
    },
    {
      game: "tron",
      rows: [
        { name: "me", value: "2" },
        { name: "mesfsf", value: "23" },
        { name: "mesfsf", value: "3" },
      ],
    },
  ];

  const previousLeaderboard = () => {
    if (currentLeaderboardIndex > 0) {
      setCurrentLeaderboardIndex(currentLeaderboardIndex - 1);
    }
    if(nextCount - 1 > 0){
      setNextCount(nextCount - 1);
    }
    
  };

  const nextLeaderboard = () => {
    if (currentLeaderboardIndex < leaderboards.length - 1) {
      setCurrentLeaderboardIndex(currentLeaderboardIndex + 1);
    }
    setNextCount(nextCount + 1);
    
  };
  return (
    <Box padding={2} className="landingPage">
      <Box bgcolor="white" padding={2} marginBottom={2}>
        <Typography variant="h3" color="black">
          brAIn🧠rot
        </Typography>
        {nextCount === 10 ? <Rick/> : <></>}
      </Box>
      <div className="container">
        <div className="cardContainer">
          <GameCard game_name={"Chess"} />
          <GameCard game_name={"Othello"} />
          <GameCard game_name={"Connect4"} />
          <GameCard game_name={"Filler"} />
          <GameCard game_name={"Tron"} />
          {/* <GameCard game_name={"Rock, Paper, Scissors!"} /> */}
        </div>
        <div className="leaderboardContainer" flex="1" justifyContent="center">
          <Leaderboard
            rows={leaderboards[currentLeaderboardIndex].rows}
            game={leaderboards[currentLeaderboardIndex].game}
          />
          <Box display='grid' justifyContent='center'>
          <Stack direction="row">
            
              <Button
                startIcon={<ArrowBackIosIcon />}
                onClick={previousLeaderboard}
              >
                Previous
              </Button>
              <Button
                endIcon={<ArrowForwardIosIcon />}
                onClick={nextLeaderboard}
              >
                Next
              </Button>
            
          </Stack>
          </Box>
        </div>
      </div>
    </Box>
  );
}

export default LandingPage;
