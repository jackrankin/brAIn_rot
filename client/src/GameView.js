import React from 'react';
import { Box } from '@mui/material';

function GameView( { game_name, player1, player2 } ) {

	return (
        <Box display='grid' justifyContent='center' padding={2}>
            {game_name + ': ' + player1 + ' vs ' + player2}
        </Box>
	);
}

export default GameView;
