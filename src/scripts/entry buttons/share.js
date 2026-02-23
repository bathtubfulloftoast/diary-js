import bdate from '/functions/date.js';

export default function share(w,bas,h) {
const {year,month,day} = bdate(h);

const copylink = document.createElement("a");
copylink.href = "#";
const clico = document.createElement("i");
clico.className = "bi bi-share-fill";

copylink.appendChild(clico);

if (window.isSecureContext == true) {
    let copyURL = window.location.origin;
    if(document.head.getAttribute("puburl")) {
        copyURL = document.head.getAttribute("puburl");
    }

    w.appendChild(copylink);

    copylink.addEventListener("click", function(event) {
        event.preventDefault();
        navigator.clipboard.writeText(copyURL+bas+"share/"+`?date=${month}/${day}/${year}`);
    });
}
}
