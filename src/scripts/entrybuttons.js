document.addEventListener("DOMContentLoaded", async function() {
    const baseURL = document.head.getAttribute("baseurl");

    let hash = window.location.hash;
    hash = hash.substring(1);
    hash = decodeURI(hash);

    const date = new Date(hash);
    var day = String(date.getDate());
    var month = String(date.getMonth() + 1); //January is 0!
    var year = date.getFullYear();

    document.getElementById("goback").href=baseURL+"entries#"+year;

    const edit = document.getElementById("edit");
    edit.href = edit.href + `${year}/${month}/${day}/`;


    document.getElementById("totop").addEventListener("click", function(event) {
        event.preventDefault();
        window.scrollTo(0, 0);
    })

    const copylink = document.getElementById("copylink");
    if (window.isSecureContext == true) {
        let copyURL = window.location.origin;
        if(copylink.getAttribute("puburl")) {
            copyURL = copylink.getAttribute("puburl");
        }

        copylink.addEventListener("click", function(event) {
            event.preventDefault();
            navigator.clipboard.writeText(copyURL+baseURL+"share/"+`?date=${month}/${day}/${year}`);
        });
    } else {
        copylink.remove();
    }


});
