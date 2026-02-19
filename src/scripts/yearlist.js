document.addEventListener("DOMContentLoaded", async function() {
    const baseURL = document.head.getAttribute("baseurl");

    const date = new Date();
    var day = String(date.getDate());
    var month = String(date.getMonth() + 1); //January is 0!
    var year = date.getFullYear();

    // const response = await fetch(baseURL+'yearlist.json');
    const response = await fetch(baseURL+'api/yearlist');

    if(!response.ok) {
    alert(`couldnt grab entries status code: ${response.status}`);
    return;
    }

    const data = await response.json();

    const wrap = document.getElementById("yearlist");

    if(data.length == 0){
    return wrap.innerHTML = `no entries found<br>please make a file at <code>entries/${year}/${month}/${day}/entry.html</code> (Year/Month/Day Format)`;
    }

    data.forEach(myFunction);

    function myFunction(item, index) {
        const text = document.createElement("h2");
        text.className="button";
        const link = document.createElement("a");
        link.innerHTML = item;
        link.href= baseURL+"entries#"+item;

        text.appendChild(link);
        wrap.appendChild(text);
    }
});
