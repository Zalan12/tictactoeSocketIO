const socket = io();

const JatekGombok = document.getElementsByClassName("JatekGombok");
const currentPlayer = 0;
const config=window.CHAT_CONFIG;

let map = [[0,0,0],[0,0,0],[0,0,0]];

for(let i = 0; i < JatekGombok.length; i++){
    JatekGombok[i].addEventListener('click',()=>{
        socket.emit("gombKatt", {AdottGomb:i,player:currentPlayer})
    });
}


socket.emit('join-room',{nickname:config.nickname,room:config.roomId})

socket.on('GombAktival',({idx,player}) =>{
    console.log("INDEX: " + idx)
    console.log("JÁTÉKOS: " + config.nickname)
    JatekGombok[idx].classList.add("Tiltott")
    JatekGombok[idx].classList.remove("hoverEffekt")

    let kep = document.createElement('img');
    kep.src = "assets/imgs/kekKor2.png"
    kep.style.width = "80%";
    kep.style.height = "80%";

    JatekGombok[idx].appendChild(kep)
    JatekGombok[idx].disabled = "true"
})