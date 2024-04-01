import React from "react";
import Leaderboard from "./GamePage.js";
import LandingPage from "./landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  const darkTheme = createTheme({
    palette: {
      // mode: "dark",
    },
  });

  return (
    <Router>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Leaderboard/:name" element={<Leaderboard />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
