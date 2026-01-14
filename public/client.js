const socket = io();

function newRoom()
{
    let r=Math.floor(Math.random() * 1000);
    return {"room":r}
}