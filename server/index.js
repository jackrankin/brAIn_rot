const fs = require('fs');
const express = require('express');
const cors = require('cors');
let { PythonShell } = require('python-shell');
const app = express();
const port = 80;

app.use(cors());
app.use(express.json());

app.post('/python', (req, res) => {
	fs.writeFileSync('test.py', req.body.userCode);
	console.log(req.body);

	let options = {
		mode: 'text',
		pythonOptions: ['-u'],
		args: [1, 2, 3]
	};

	PythonShell.run('test.py', options).then(messages => {
		console.log('results: %j', messages);
		res.json({ output: messages });
	});

})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
})