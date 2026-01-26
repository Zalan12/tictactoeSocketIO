
const socket = io();
const buttons = document.querySelectorAll('.JatekGombok');
const room = document.body.dataset.room;

const turnText = document.getElementById('turnText');
const logDiv = document.getElementById('szovegfal');
const resetBtn = document.getElementById('resetBtn');

let mySymbol = null;

function logMove(text) {
    const p = document.createElement('p');
    p.innerText = text;
    logDiv.appendChild(p);
}

socket.emit('joinRoom', { room });

buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        if (!mySymbol) return;
        socket.emit('makeMove', index);
        logMove(`(${mySymbol}) lépett ide: ${index + 1}`);
    });
});

socket.on('playerSymbol', symbol => {
    mySymbol = symbol;
    turnText.innerText = `Te vagy: ${symbol}`;
});

socket.on('spectator', () => {
    turnText.innerText = 'Megfigyelő mód';
});

socket.on('boardUpdate', ({ board, currentTurn }) => {
    board.forEach((val, i) => {
        buttons[i].innerText = val || '';
        buttons[i].disabled = !!val;
    });

    if (!mySymbol) return;

    if (currentTurn === mySymbol) {
        turnText.innerText = 'Te következel';
    } else {
        turnText.innerText = 'Ellenfél következik';
    }
});

socket.on('gameOver', winner => {
    if (winner === 'draw') {
        turnText.innerText = '⚖️ Döntetlen!';
        logMove('⚖️ Döntetlen');
    } else {
        turnText.innerText = `🏆 Győztes: ${winner}`;
        logMove(`🏆 Győztes: ${winner}`);
    }
});

if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        location.reload();
    });
}
