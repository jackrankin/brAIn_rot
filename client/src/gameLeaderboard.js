import * as React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import CodeSubmit from "./CodeSubmit";
import axios from "axios";
import "./gameLeaderboard.css";

function createData(name, points, time, memory) {
  return { name, points, time, memory };
}

const rows = [
  createData("Drew Bot", 1, 100, 24),
  createData("Chaitra Bot", 50, 9.0, 37),
  createData("Jack Bot", 3, 25, 24),
];

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const routeParams = useParams();

  useEffect(() => {
    const getGame = () => {
      axios
        .get(
          "http://127.0.0.1:5000/leaderboard/" + routeParams.name.toLowerCase()
        )
        .then((res) => {
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
  }, [routeParams.name]);

  return (
    <div>
      <Typography variant="h2" style={{ marginBottom: "20px" }}>
        {"Top bots for " + (routeParams ? routeParams.name : "")}
      </Typography>
      <div id="leaderBoardTable">
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>Bot Name</TableCell>
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
        <CodeSubmit game_name={"connect4"} />
      </div>
    </div>
  );
}
