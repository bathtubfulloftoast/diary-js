import bdate from '/functions/date.js';

export default function back(hash,w,bas) {
const {year,month,day} = bdate(hash);

const goback = document.createElement("a");
goback.href=bas+"entries#"+year;
const bico = document.createElement("i");
bico.className = "bi bi-arrow-left";

goback.appendChild(bico);
w.appendChild(goback);
}
