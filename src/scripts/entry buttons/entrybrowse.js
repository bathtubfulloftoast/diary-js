import bdate from '/functions/date.js';

export default async function entrynav(w,h,b) {// i dont know how to grab this shit from outside the function and im too lazy to figure it out
const {year,month,day} = bdate(h);

// const response = await fetch(b+`entries.json`);
const response = await fetch(b+`api/entries?year=${year}`);
const data = await response.json();
const index = data.indexOf(`${month}-${day}`);
var next = data[index+1];
var prev = data[index-1];


const pint = document.createElement("a");
pint.href = "#";
const pico = document.createElement("i");
pico.className = "bi bi-arrow-left"; // go pico yeah yeah

const nint = document.createElement("a");
nint.href = "#";
const nico = document.createElement("i");
nico.className = "bi bi-arrow-right";//oneshot ref

nint.appendChild(nico);
pint.appendChild(pico);

if(prev) {w.appendChild(pint);}
if(next) {w.appendChild(nint);}

nint.addEventListener("click", async function(event) {
event.preventDefault();
window.location.hash=next.replace("-","/")+"/"+year;
window.location.reload();
});

pint.addEventListener("click", async function(event) {
event.preventDefault();
window.location.hash=prev.replace("-","/")+"/"+year;
window.location.reload();
});

}
