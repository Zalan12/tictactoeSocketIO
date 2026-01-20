const socket = io();

const JatekGombok = document.getElementsByClassName("JatekGombok");
const currentPlayer = 0

for(let i = 0; i < JatekGombok.length; i++){
    JatekGombok[i].addEventListener('click',()=>{
        socket.emit("gombKatt", {idx:i,player:currentPlayer})
    });
}

socket.on('gombKatt',(idx) =>{
    alert(idx)
})