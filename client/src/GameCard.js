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
import chessGIF from "./images/chess.gif";
import othelloGIF from "./images/othello.gif";
import { useNavigate } from "react-router-dom";

const imageMap = {
  Connect4: c4GIF,
  Tron: tronGIF,
  Filler: FILLERGIF,
  "Rock, Paper, Scissors!": RPGIF,
  "Chess": chessGIF,
  "Othello": othelloGIF
};
const descriptionMap = {
  Connect4: "A game where players try to create horizontal, vertical, or diagonal rows of four.",
  Tron: "THIS IS TRON IT IS A FUN GAME",
  Filler: "A color matching game where the goal is to fill the board with your color.",
  "Rock, Paper, Scissors!": "ROCK, OR PAPER, or scissors",
  "Chess": "A strategy game where the goal is to checkmate your opponent.",
  "Othello": "AKA Reversi, a two-player strategy game where the goal is to dominate the board."
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
