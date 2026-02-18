document.addEventListener("DOMContentLoaded", async function() {
    const baseURL = document.head.getAttribute("baseurl");

    // const response = await fetch(baseURL+'yearlist.json');
    const response = await fetch(baseURL+'api/yearlist');
    const data = await response.json();

    const wrap = document.getElementById("yearlist");

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
