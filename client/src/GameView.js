import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import axios from 'axios';

function GameView( { game_name, player1, player2 } ) {

    const [fullGame, setFullGame] = useState([]);

    useEffect(() => {

		const getGame = () => {
            axios
                .post('http://localhost:80/play_bots', { player1: player1, player2: player2, game: game_name })
                .then((res) => {
                    const arr = res.data.output.reduce(function(result, value, index, array) {
                        if (index % 8 === 0)
                            result.push(array.slice(index, index + 8).join('\n'));
                        return result;
                    }, []);
                    console.log(arr);
                    setFullGame(arr);
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
        </Box>
	);
}

export default GameView;
