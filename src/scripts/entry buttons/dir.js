export default function directory(w,bas,h) {
const directory = document.createElement("a");
directory.href = bas+"directory/?date="+h;
const dico = document.createElement("i");
dico.className = "bi bi-folder-fill";

directory.appendChild(dico);
w.appendChild(directory);
}
