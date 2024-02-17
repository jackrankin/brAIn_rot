import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { python } from '@codemirror/lang-python';
import { Box, Button, Stack, TextField } from '@mui/material';
import { code_map } from './StarterCode';
import axios from 'axios';

function CodeSubmit( { game_name } ) {

	const [userCode, setUserCode] = useState(code_map[game_name]);
    const [name, setName] = useState('');

	const onChange = (value) => {
		setUserCode(value);
	};

	const submitCode = () => {
		axios
			.post('http://localhost:80/submit_code', { code: userCode, game: game_name, name: name })
			.then((res) => {
				console.log(res);
			});
	}

	return (
        <Box display='grid' justifyContent='center' padding={2}>
            <Stack spacing={2}>
                <CodeMirror
                    value={userCode}
                    theme={vscodeDark}
                    onChange={onChange}
                    extensions={[python()]}
                />
                <TextField label='Name Your Bot' type='name' onChange={(e) => setName(e.target.value)}/>
                <Button variant='contained' onClick={submitCode} disabled={!name}>Submit Bot</Button>
            </Stack>
        </Box>
	);
}

export default CodeSubmit;