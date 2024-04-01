import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import c4GIF from "./images/c4.gif";
import FILLERGIF from "./images/filler.gif";
import tronGIF from "./images/tron.gif";
import RPGIF from "./images/rp.gif";
import { useNavigate } from "react-router-dom";

const imageMap = {
  Connect4: c4GIF,
  Tron: tronGIF,
  Filler: FILLERGIF,
  "Rock, Paper, Scissors!": RPGIF,
};
const descriptionMap = {
  Connect4: "THIS IS CONNECT FOUR IT IS FUN",
  Tron: "THIS IS TRON IT IS A FUN GAME",
  Filler: "FILLLLLLLER",
  "Rock, Paper, Scissors!": "ROCK, OR PAPER, or scissors",
};
const linkMap = {
  "Rock, Paper, Scissors!": "rockpaperscissors",
  Connect4: "connect4",
  Tron: "tron",
  Filler: "filler",
};

export default function GameCard({ game_name }) {
  let navigate = useNavigate();

  return (
    <Card onClick={() => navigate("/Leaderboard/" + linkMap[game_name])}>
      <CardActionArea>
        <CardMedia
          component="img"
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
