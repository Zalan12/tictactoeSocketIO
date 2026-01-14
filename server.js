const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const ejs = require('ejs');
const path = require('path');


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    const {error = '', nickname = '', room = ''} = req.query;
    res.render('index', { rooms: ROOMS, error: ERRORS[error], nickname, room });
});

server.listen(3000, ()=>{
    console.log(`http://localhost:3000`);
});