const socket = io();

const JatekGombok = document.getElementsByClassName("JatekGombok");
let currentPlayer = 0;
let symbols=["X","0"];
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
    if(currentPlayer==0)
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
    console.log(map)
    JatekGombok[idx].appendChild(kep)
    JatekGombok[idx].disabled = "true"
})