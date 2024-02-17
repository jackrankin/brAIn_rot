import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { python } from '@codemirror/lang-python';
import { Box, Button } from '@mui/material';
import { filler_code, rps_code, tron_code, connect4_code } from './StarterCode';
import axios from 'axios';

function App() {

	const game_name = 'filler';
	const code_map = { 'filler': filler_code, 'connect4': connect4_code, 'rps': rps_code, 'tron': tron_code };

	const [userCode, setUserCode] = useState(code_map[game_name]);

	// also ensure no duplicates
	const bot_name = 'test';

	const onChange = (value) => {
		setUserCode(value);
	};

	const submitCode = () => {
		axios
			.post('http://localhost:80/submit_code', { code: userCode, game: game_name, name: bot_name })
			.then((res) => {
				console.log(res);
			});
	}

	return (
		<div className='App'>
			<Box display='grid' justifyContent='center' padding={2}>
				<CodeMirror
					value={userCode}
					theme={vscodeDark}
					onChange={onChange}
					extensions={[python()]}
				/>
				<Button onClick={submitCode}>Submit</Button>
			</Box>
		</div>
	);
}

export default App;
