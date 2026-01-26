
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const chatConfig = { enabled: false };

const ROOM = 'room';
let players = [];
let board = Array(9).fill(null);
let turn = 'X';

app.get('/', (req, res) => {
    res.render('index', {
        nickname: '',
        rooms: [{ id: ROOM, label: 'Main room' }],
        room: ROOM,
        chatConfig
    });
});

app.get('/game', (req, res) => {
    const { nickname = '', room = ROOM } = req.query;
    res.render('game', { nickname, room, chatConfig });
});

io.on('connection', socket => {

    socket.on('joinRoom', ({ room }) => {
        socket.join(room);

        if (players.length < 2) {
            const symbol = players.length === 0 ? 'X' : 'O';
            players.push({ id: socket.id, symbol });
            socket.emit('playerSymbol', symbol);
        } else {
            socket.emit('spectator');
        }

        socket.emit('boardUpdate', { board, currentTurn: turn });
    });

    socket.on('makeMove', index => {
        const player = players.find(p => p.id === socket.id);
        if (!player) return;
        if (player.symbol !== turn) return;
        if (board[index]) return;

        board[index] = player.symbol;
        turn = turn === 'X' ? 'O' : 'X';

        io.emit('boardUpdate', { board, currentTurn: turn });

        const w = checkWinner();
        if (w) {
            io.emit('gameOver', w);
            board = Array(9).fill(null);
            turn = 'X';
        }
    });

    socket.on('disconnect', () => {
        players = players.filter(p => p.id !== socket.id);
    });
});

function checkWinner() {
    const wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    for (let [a,b,c] of wins) {
        if (board[a] && board[a] === board[b] && board[a] === board[c])
            return board[a];
    }
    if (board.every(Boolean)) return 'draw';
    return null;
}

http.listen(3000, () => console.log('http://localhost:3000'));
