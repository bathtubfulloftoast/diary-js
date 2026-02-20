document.addEventListener("DOMContentLoaded", async function() {
    const baseURL = document.head.getAttribute("baseurl");

    let hash = window.location.hash;
    hash = hash.substring(1);
    hash = decodeURI(hash);

    const date = new Date(hash);
    var day = String(date.getDate());
    var month = String(date.getMonth() + 1); //January is 0!
    var year = date.getFullYear();

    const wrapper = document.getElementById("topicons");
    const goback = document.createElement("a");
    goback.href=baseURL+"entries#"+year;
    const bico = document.createElement("i");
    bico.className = "bi bi-arrow-left";

    goback.appendChild(bico);
    wrapper.appendChild(goback);

    if (document.head.editurl) {
    const edit = document.createElement("a");
    edit.href = document.head.editurl + `${year}/${month}/${day}/`;
    const eico = document.createElement("i");
    eico.className = "bi bi-pencil-square";

    edit.appendChild(eico);
    wrapper.appendChild(edit);
    }

    const directory = document.createElement("a");
    directory.href = baseURL+"directory/?date="+hash;
    const dico = document.createElement("i");
    dico.className = "bi bi-folder-fill";

    directory.appendChild(dico);
    wrapper.appendChild(directory);

    document.getElementById("totop").addEventListener("click", function(event) {
        event.preventDefault();
        window.scrollTo(0, 0);
    })

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

        wrapper.appendChild(copylink);

        copylink.addEventListener("click", function(event) {
            event.preventDefault();
            navigator.clipboard.writeText(copyURL+baseURL+"share/"+`?date=${month}/${day}/${year}`);
        });
    }


});
