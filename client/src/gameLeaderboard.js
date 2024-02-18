import * as React from "react";
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

function createData(name, points, time, memory) {
  return { name, points, time, memory };
}

const rows = [
  createData("Drew Bot", 1, 100, 24),
  createData("Chaitra Bot", 50, 9.0, 37),
  createData("Jack Bot", 3, 25, 24),
];

export default function Leaderboard() {
  let routeParams = useParams();

  return (
    <div>
      <Typography variant="h2" style={{ marginBottom: "20px" }}>
        {"Top bots for " + (routeParams ? routeParams.name : "")}
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell align="right">Points</TableCell>
              <TableCell align="right">Time(s)</TableCell>
              <TableCell align="right">Memory(mb)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="right">{row.points}</TableCell>
                <TableCell align="right">{row.time}</TableCell>
                <TableCell align="right">{row.memory}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CodeSubmit game_name={"connect4"} />
    </div>
  );
}
