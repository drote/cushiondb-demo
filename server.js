const express = require('express');
const server = express();
const path = require('path');

server.use(express.static('./'))

server.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/index.html'))
});

server.listen('8080', () => console.log('Listening on 8080'));

