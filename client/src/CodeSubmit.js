import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { python } from "@codemirror/lang-python";
import {
  Box,
  Button,
  DialogContent,
  DialogContentText,
  Stack,
  TextField,
} from "@mui/material";
import { code_map } from "./Constants";
import axios from "axios";
import "./CodeSubmit.css";
import { useNavigate } from "react-router-dom";
function CodeSubmit({ game_name }) {
  const [userCode, setUserCode] = useState(code_map[game_name]);
  const [name, setName] = useState("");

  let navigate = useNavigate();
  const onChange = (value) => {
    setUserCode(value);
  };

  const submitCode = () => {
    axios
      .post("http://localhost:80/submit_code", {
        code: userCode,
        game: game_name,
        name: name,
      })
      .then((res) => {
        console.log(res);
        console.log(game_name);
        navigate("/Leaderboard/" + game_name);
      });
  };

  return (
    <Box id="CodeSubmit">
      <Box display="flex" justifyContent="center">
        <DialogContent style={{ width: "70%" }}>
          <DialogContentText id="alert-dialog-description">
            Submit your own bot!
          </DialogContentText>
          <Stack spacing={2}>
            <TextField
              label="Name Your Bot"
              type="name"
              onChange={(e) => setName(e.target.value)}
            />
            <CodeMirror
              height={"400px"}
              value={userCode}
              theme={vscodeDark}
              onChange={onChange}
              extensions={[python()]}
            />
            <Button variant="contained" onClick={submitCode} disabled={!name}>
              Submit Bot
            </Button>
          </Stack>
        </DialogContent>
      </Box>
    </Box>
  );
}

export default CodeSubmit;
