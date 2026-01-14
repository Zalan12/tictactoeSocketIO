const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const ejs = require('ejs');
const path = require('path');


const ROOMS = [
    {id:"pali",label:"Halo"}
]

const ERRORS = {
    missingFileds: 'Hiányzó belépési adatok!'
}

const getRoomById = (roomId) => { return ROOMS.find((room) => room.id === roomId)};

const connectedUsers = new Map(); // socket.id => { username, room }

const emitRoomUsers = (room) => {
    const usersInRoom = Array.from(connectedUsers.values())
                        .filter((user) => user.room === room)
                        .map((user) => user.nickname);

    io.to(room).emit('room-users', {users: usersInRoom});
}; 

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    const {error = '', nickname = '', room = ''} = req.query;
    res.render('index', { rooms: ROOMS, error: ERRORS[error], nickname, room });
});
app.get('/game', (req,res) =>{
        const { nickname, room} = req.query;
    
    if (!nickname || !room) {
        return res.redirect(`/?error=missingFileds&nickname=${nickname}&room=${room}`);
    }

    const chatConfig = {
        nickname,
        roomId: room,
        roomLabel: getRoomById(room).label,
    } 
    res.render('game')
})



server.listen(3000, ()=>{
    console.log(`http://localhost:3000`);
});