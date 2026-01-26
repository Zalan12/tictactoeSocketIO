const e = require("express");

const socket = io();

const JatekGombok = document.getElementsByClassName("JatekGombok");
let currentPlayer = 1;
let symbols=["","X","0"];
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
    if(currentPlayer==1)
    {
        kep.src = "assets/imgs/kekKor2.png";
        currentPlayer++;
    }
    else{
        kep.src = "assets/imgs/pirosX2.png";
        currentPlayer--;
    }
    kep.style.width = "80%";
    kep.style.height = "80%";

    let log=document.getElementById('szovegfal');
    log.innerText+=config.nickname+" megjelölte az " +idx+" indexű elemet "+ symbols[currentPlayer] +" szimbólummal\n";
    if(idx<=2)
        {
            map[0][idx]=currentPlayer;
        }

    else if(idx>2 && idx<=5)
        {
            map[1][(idx-3)]=currentPlayer;
        }
    else if(idx>5 && idx<=8)
        {
            map[2][(idx-6)]=currentPlayer;
        }
    console.log(map)
    JatekGombok[idx].appendChild(kep)
    JatekGombok[idx].disabled = "true"
    if(map.forEach(row => {row.forEach(column=>{})}))

})

function endGame()
{
 alert("Old meg magad")
}