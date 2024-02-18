import React from "react";
import CodeSubmit from "./CodeSubmit";
import Leaderboard from "./leaderboard.js";
import LandingPage from "./landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GameView from "./GameView.js";



function App() {

	const darkTheme = createTheme({
		palette: {
		  mode: 'dark',
		},
	});

	return (
		<Router>
			<ThemeProvider theme={darkTheme}>
				<CssBaseline />
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/Leaderboard/:name" element={<Leaderboard />} />
					<Route path="/Game" element={<GameView game_name={'filler'} player1={'filler_random'} player2={'filler_random'}/>} />
				</Routes>
			</ThemeProvider>
		</Router>
	);
}

export default App;
