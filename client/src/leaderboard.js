import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography, Box } from "@mui/material";
import axios from "axios";

const reverseMap = {
  rockpaperscissors: "Rock, Paper, Scissors!",
  connect4: "Connect4",
  tron: "Tron",
  filler: "Filler",
};

export default function Leaderboard({ game }) {
  const [leaderboardData, setLeaderboardData] = useState([]);
  useEffect(() => {
    const getGame = () => {
      axios.get("http://127.0.0.1:5000/leaderboard/" + game).then((res) => {
        setLeaderboardData(
          Object.entries(res.data).map(([name, value]) => ({
            name,
            value,
          }))
        );
        console.log(leaderboardData);
      });
    };

    getGame();
  }, [game]);

  return (
    <Box paddingBottom={1}>
      <Typography variant="h4">
        {"Top " + reverseMap[game] + " bots"}
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Points</TableCell>
              {/* <TableCell>Time(s)</TableCell>
              <TableCell>Memory(mb)</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboardData.map((element, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>{element.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
