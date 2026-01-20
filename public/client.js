const socket = io();

const JatekGombok = document.getElementsByClassName("JatekGombok");

for(let i = 0; i < JatekGombok.length; i++){
    JatekGombok[i].addEventListener('click',()=>{
        alert(i);
    });
}