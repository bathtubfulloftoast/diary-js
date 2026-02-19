document.addEventListener("DOMContentLoaded", async function() {
const baseURL = document.head.getAttribute("baseurl");
const urlParams = new URLSearchParams(window.location.search);
const date = urlParams.get('date');
var dir = urlParams.get('dir') || "";
dir = dir.replace(/^\//g, "");

// const response = await fetch(baseURL+'dir.json');
const response = await fetch(baseURL+`api/dir?date=${date}&dir=${dir}`);

if(!response.ok) {
alert(`couldnt grab directory. status code: ${response.status}`);
window.location.replace("/");
return;
}

const data = await response.json();
if(data.error) {
alert(data.error);
window.location.replace("/");
return;
}


const wrap = document.getElementById("content");
wrap.innerHTML = "";

if(data.parent) {
const parent = document.createElement("a");
parent.innerHTML = "../<br>";
parent.href=baseURL+`api/file?date=${date}&file=${data.parent}`;
wrap.appendChild(parent);
}

data.content.forEach(myFunction);

function myFunction(item, index) {
    const text = document.createElement("a");
    text.innerHTML = item+"<br>";
    text.href=baseURL+`api/file?date=${date}&file=${dir}/${item}`.replace(/\/+/g, "/");

    wrap.appendChild(text);
}

const topiconwrap = document.getElementById("topicons");

const bbutt = document.createElement("a"); // hehe butt
bbutt.href= baseURL+"entry#"+date;
const bicon = document.createElement("i");
bicon.className = "bi bi-arrow-left";

bbutt.appendChild(bicon);
topiconwrap.appendChild(bbutt);
});
