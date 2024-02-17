import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { python } from '@codemirror/lang-python';
import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';

function App() {

	const [userCode, setUserCode] = useState('print("hello world")');
	const [output, setOutput] = useState([]);

	const onChange = (value) => {
		setUserCode(value);
	};

	const submitCode = () => {
		axios
			.post('http://localhost:80/python', {userCode})
			.then((res) => {
				setOutput(res.data.output);
			});
	}

	return (
		<div className='App'>
			<Box display='grid' justifyContent='center' padding={2}>
				<Typography>Write your python code here:</Typography>
				<CodeMirror
					value={userCode}
					theme={vscodeDark}
					onChange={onChange}
					extensions={[python()]}
				/>
				<Button onClick={submitCode}>Submit</Button>
				<Typography>Output:</Typography>
				{output.map((line, i) => (
                    <p key={i}>{line}</p>
                ))}
			</Box>
		</div>
	);
}

export default App;
