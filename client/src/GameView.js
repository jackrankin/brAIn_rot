import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';

function GameView( { game_name, player1, player2 } ) {

    const [fullGame, setFullGame] = useState([]);

    useEffect(() => {

		const getGame = () => {
            axios
                .post('http://localhost:80/play_bots', { player1: player1, player2: player2, game: game_name })
                .then((res) => {
                    setFullGame(res.data.output);
                });
        }

        getGame();

	}, [player1, player2, game_name]);
  
	return (
        <Box display='grid' justifyContent='center' padding={2}>
            {game_name + ': ' + player1 + ' vs ' + player2}
            {fullGame.map((line, i) => (
                <p key={i}>{line}</p>
            ))}
        </Box>
	);
}

export default GameView;
