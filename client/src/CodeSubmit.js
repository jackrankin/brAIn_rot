import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { python } from '@codemirror/lang-python';
import { Box, Button, Dialog, DialogContent, DialogContentText, Stack, TextField } from '@mui/material';
import { code_map } from './Constants';
import axios from 'axios';

function CodeSubmit( { game_name } ) {

	const [userCode, setUserCode] = useState(code_map[game_name]);
    const [name, setName] = useState('');

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
            <Button onClick={handleClickOpen}>Submit</Button>
            <Dialog open={open} onClose={handleClose}>
                <Box padding={2} display='grid' justifyContent='center'>
                    <DialogContent>
                        <DialogContentText id='alert-dialog-description'>Submit your own bot!</DialogContentText>
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
                    </DialogContent>
                </Box>
            </Dialog>
        </Box>
	);
}

export default CodeSubmit;
