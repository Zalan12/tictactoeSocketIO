const socket = io();

const jatekGombok = document.getElementsByClassName("JatekGombok")

for(let i = 0; i < jatekGombok.length; i++){
    jatekGombok[i].addEventListener('click',()=>{
        alert(i)
    })
}