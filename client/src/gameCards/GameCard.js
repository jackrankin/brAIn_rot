import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Connect4Image from "../gameImages/c4.png";
import TronIMG from "../gameImages/tron.webp";
import FillerIMG from "../gameImages/filler.png";
import RockPaperScissorsIMG from "../gameImages/rp.png";
import Leaderboard from "../gameLeaderboard.js";
import { useNavigate } from "react-router-dom";

const imageMap = {
  Connect4: Connect4Image,
  Tron: TronIMG,
  Filler: FillerIMG,
  RockPaperScissors: RockPaperScissorsIMG,
};
const descriptionMap = {
  Connect4: "THIS IS CONNECT FOUR IT IS FUN",
  Tron: "THIS IS TRON IT IS A FUN GAME",
  Filler: "FILLLLLLLER",
  RockPaperScissors: "ROCK, OR PAPER, or scissors",
};

const leaderBoardMap = {
  Connect4: { Leaderboard },
  Filler: { Leaderboard },
  Tron: { Leaderboard },
  RockPaperScissors: { Leaderboard },
};
export default function GameCard({ game_name }) {
  let navigate = useNavigate();

  return (
    <Card
      sx={{ maxWidth: 500 }}
      onClick={() => navigate("\\Leaderboard\\connect4")}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image={imageMap[game_name]}
          alt={game_name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {game_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {descriptionMap[game_name]}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
