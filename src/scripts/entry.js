// Source - https://stackoverflow.com/a/47614491
// Posted by allenhwkim, modified by community. See post 'Timeline' for change history
// Retrieved 2026-02-17, License - CC BY-SA 4.0

function setInnerHTML(elm, html) {
    elm.innerHTML = html;

    Array.from(elm.querySelectorAll("script"))
    .forEach( oldScriptEl => {
        const newScriptEl = document.createElement("script");

        Array.from(oldScriptEl.attributes).forEach( attr => {
            newScriptEl.setAttribute(attr.name, attr.value)
        });

        const scriptText = document.createTextNode(oldScriptEl.innerHTML);
        newScriptEl.appendChild(scriptText);

        oldScriptEl.parentNode.replaceChild(newScriptEl, oldScriptEl);
    });
}


document.addEventListener("DOMContentLoaded", async function() {
    const baseURL = document.head.getAttribute("baseurl");

    let hash = window.location.hash;
    hash = hash.substring(1);
    hash = decodeURI(hash);

    const date = new Date(hash);


    document.title=date.toLocaleString('default', { dateStyle: 'long' });

    // const response = await fetch('/entry.html');
    const response = await fetch(baseURL+`api/file?date=${hash}&file=entry.html`);
    const data = await response.text();

    if(!response.ok) {
        alert("couldnt grab entry");
        window.location.replace("/"); // doing this or else you get stuck in an annoying loop until you get to the main page
        return;
    }

    const tcont = document.getElementById("content");
    setInnerHTML(tcont, data);


    const spoilers = tcont.querySelectorAll("spoiler");

    spoilers.forEach(async (spoiler) => {
        spoiler.className="hidden";
        spoiler.addEventListener("click", function(event) {
            if(spoiler.className == "hidden" ) {
                spoiler.removeAttribute('class');
            } else {
                spoiler.className="hidden";
            }
        })
    });
});
