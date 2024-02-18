import * as React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography, Button, Box, Tab, IconButton } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import CodeSubmit from "./CodeSubmit";
import axios from "axios";
import "./gameLeaderboard.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SportsMmaIcon from "@mui/icons-material/SportsMma";
import GameView from "./GameView.js";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import HomeIcon from '@mui/icons-material/Home';

const reverseMap = {
  rockpaperscissors: "Rock, Paper, Scissors!",
  connect4: "Connect4",
  tron: "Tron",
  filler: "Filler",
};

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);

  const routeParams = useParams();
  let navigate = useNavigate();

  const [bot1, setbot1] = React.useState("");
  const [showGame, setShowGame] = useState(false);

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange1 = (event) => {
    setbot1(event.target.value);
  };

  const [bot2, setbot2] = React.useState("");

  const handleChange2 = (event) => {
    setbot2(event.target.value);
  };
  useEffect(() => {
    const getGame = () => {
      axios
        .get("http://127.0.0.1:5000/leaderboard/" + routeParams.name)
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
    <Box padding={2}>
      <Box bgcolor="white" padding={2} marginBottom={2} display='flex' justifyContent='space-between'>
        <Typography variant="h3" color="black">
          {reverseMap[routeParams.name]}
        </Typography>
        <IconButton onClick={() => { navigate('/'); }} sx={{ color: "#000000" }}><HomeIcon/></IconButton>
      </Box>
      <div className="container">
        <div id="leaderBoardTable">
          <Typography variant="h3">Leaderboard</Typography>
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
        </div>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Code Mode" value="1" />
                <Tab label="Battle Mode" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <CodeSubmit game_name={routeParams.name.toLowerCase()} />
            </TabPanel>
            <TabPanel value="2">
              {showGame ? (
                <div>
                  <Box display="grid" justifyContent="center" padding={1}>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setShowGame(false);
                      }}
                    >
                      New Battle
                    </Button>
                  </Box>
                  <GameView
                    game_name={routeParams.name}
                    player1={bot1}
                    player2={bot2}
                  />
                </div>
              ) : (
                <div>
                  <Typography style={{ padding: 5 }}>
                    Pick the bots you'd like to battle
                  </Typography>
                  <FormControl fullWidth style={{}}>
                    <InputLabel id="demo-simple-select-label">
                      Bot Number 1
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={bot1}
                      label="Bot Number 1"
                      onChange={handleChange1}
                    >
                      {leaderboardData.map((element, index) => (
                        <MenuItem value={element.value}>
                          {element.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Box display="grid" justifyContent="center" padding={1}>
                    <SportsMmaIcon size="xx-large" />
                  </Box>
                  <FormControl fullWidth style={{}}>
                    <InputLabel id="demo-simple-select-label">
                      Bot Number 2
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={bot2}
                      label="Bot Number 2"
                      onChange={handleChange2}
                    >
                      {leaderboardData.map((element, index) => (
                        <MenuItem value={element.value}>
                          {element.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Box display="grid" justifyContent="center" padding={1}>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setShowGame(true);
                      }}
                      disabled={!bot1 || !bot2}
                    >
                      Start Battle
                    </Button>
                  </Box>
                </div>
              )}
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </Box>
  );
}
