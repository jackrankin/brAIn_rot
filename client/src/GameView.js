import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import axios from 'axios';

function GameView( { game_name, player1, player2 } ) {

    const [fullGame, setFullGame] = useState([]);
    const [winner, setWinner] = useState('');

    useEffect(() => {

		const getGame = () => {
            axios
                .get('http://127.0.0.1:5000/two_play/'+player1+'/'+player2+'/'+game_name)
                .then((res) => {
                    console.log(res);
                    setFullGame(res.data.moves);
                    setWinner(res.data.winner);
                });
        }

        getGame();

	}, [player1, player2, game_name]);
  
	return (
        <Box display='grid' justifyContent='center' padding={2}>
            {game_name + ': ' + player1 + ' vs ' + player2}
            {fullGame.map((line, i) => (
                <Typography fontSize='xx-large' key={i}>{line}</Typography>
            ))}
            {winner}
        </Box>
	);
}

export default GameView;
