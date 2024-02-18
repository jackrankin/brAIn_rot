import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import "./App.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function GameView({ game_name, player1, player2 }) {
  const [fullGame, setFullGame] = useState([]);
  const [winner, setWinner] = useState("");
  const [moveNumber, setMoveNumber] = useState(0);

  const currBoard =
    fullGame && fullGame.length > 0 && game_name != "Rock, Paper, Scissors!"
      ? fullGame[moveNumber].split(/\r?\n/)
      : [];

  useEffect(() => {
    const getGame = () => {
      axios
        .get(
          "http://127.0.0.1:5000/two_play/" +
            player1 +
            "/" +
            player2 +
            "/" +
            game_name
        )
        .then((res) => {
          console.log(res);
          setFullGame(res.data.moves);
          if (res.data.winner == 2) {
            setWinner(player1);
          } else if (res.data.winner == 1) {
            setWinner(player2);
          }
          console.log(res.data.moves[0]);
        });
    };

    getGame();
  }, [player1, player2, game_name]);

  return (
    <Box display="grid" justifyContent="center" padding={2}>
      <Box display="grid" justifyContent="center">
        <Typography variant="h4">{player2 + " vs " + player1}</Typography>
      </Box>
      {game_name === "Rock, Paper, Scissors!" ? fullGame[moveNumber] : <></>}
      <Box display="grid" justifyContent="center">
        {currBoard.map((str) => (
          <p className="board">{str}</p>
        ))}
      </Box>
      <Box display="grid" justifyContent="center">
        <Stack direction="row">
          <Button
            startIcon={<ArrowBackIosIcon />}
            onClick={() => {
              if (moveNumber > 0) {
                setMoveNumber(moveNumber - 1);
              }
            }}
          >
            Previous
          </Button>
          <Button
            endIcon={<ArrowForwardIosIcon />}
            onClick={() => {
              if (moveNumber < fullGame.length - 1) {
                setMoveNumber(moveNumber + 1);
              }
            }}
          >
            Next
          </Button>
        </Stack>
        <Button
          onClick={() => {
            setMoveNumber(fullGame.length - 1);
          }}
        >
          Skip to end
        </Button>
      </Box>
      {moveNumber == fullGame.length - 1 && winner ? (
        <Box display="grid" justifyContent="center">
          <Typography variant="h4">{winner + " has won!"}</Typography>
        </Box>
      ) : (
        <></>
      )}
      {moveNumber == fullGame.length - 1 && !winner ? (
        <Box display="grid" justifyContent="center">
          <Typography variant="h4">{"Its a draw!"}</Typography>
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
}

export default GameView;
