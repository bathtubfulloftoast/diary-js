import bdate from '/functions/date.js';

export default function edit(w,h) {
const {year,month,day} = bdate(h);

const editURL = document.head.getAttribute("editurl");
if (editURL) {
const edit = document.createElement("a");
edit.href = editURL + `${year}/${month}/${day}/`;
const eico = document.createElement("i");
eico.className = "bi bi-pencil-square";

edit.appendChild(eico);
w.appendChild(edit);
}
}
