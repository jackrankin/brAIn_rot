import React from 'react';
import CodeSubmit from './CodeSubmit';
import GameView from './GameView';

function App() {

	return (
		<div className='App'>
			<CodeSubmit game_name={'filler'}/>
			<GameView game_name={'filler'} player1={'filler_random'} player2={'filler_random'} />
		</div>
	);
}

export default App;
