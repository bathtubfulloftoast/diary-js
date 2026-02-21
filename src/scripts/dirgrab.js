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
const pagenav = document.getElementById("pagenav");

const flist = data.content;
const perp = 50;
const ptot = flist.length;
const tpag = Math.ceil(ptot/perp);

const npag = document.createElement("a"); // npag feels like a slur and i dont know why
npag.href="#";
npag.innerHTML = "-&gt;";

const ppag = document.createElement("a"); // npag feels like a slur and i dont know why
ppag.href="#";
ppag.innerHTML = "&lt;-";

function poopfart(cpage) {
wrap.innerHTML = "";
const min = cpage * perp - perp;
const max = cpage * perp;


const parent = document.createElement("a");
parent.innerHTML = "../<br>";

if(data.parent) {
parent.href=baseURL+`api/file?date=${date}&file=${data.parent}`;
} else {
parent.href=baseURL+`directory/?date=${date}`;
}

wrap.appendChild(parent);


const currentlist = flist.slice(min,max);

currentlist.forEach(myFunction);

function myFunction(item, index) {
    const text = document.createElement("a");
    text.innerHTML = item.name+"<br>";
    text.href=baseURL+`api/file?date=${date}&dir=${dir}&file=${item.name}`.replace(/\/+/g, "/");

    wrap.appendChild(text);
}

}

let currentpage = 1;
if(ptot > perp){
const pwrap = document.createElement("span");
const pcount = document.createElement("span");
pcount.innerHTML = ` ${currentpage}/${tpag} `;

pwrap.appendChild(ppag);
pwrap.appendChild(pcount);
pwrap.appendChild(npag);
pagenav.appendChild(pwrap);

npag.addEventListener("click", function(event) {
event.preventDefault();
if(currentpage < tpag) {
currentpage = currentpage+1;
pcount.innerHTML = ` ${currentpage}/${tpag} `;
window.scrollTo(0, 0);
}
poopfart(currentpage);
})
ppag.addEventListener("click", function(event) {
event.preventDefault();
if(currentpage > 1) {
currentpage = currentpage-1;
pcount.innerHTML = ` ${currentpage}/${tpag} `;
window.scrollTo(0, 0);
}
poopfart(currentpage);
})
} else {
pagenav.remove();
}

poopfart(currentpage);

const topiconwrap = document.getElementById("topicons");

const bbutt = document.createElement("a"); // hehe butt
bbutt.href= baseURL+"entry#"+date;
const bicon = document.createElement("i");
bicon.className = "bi bi-arrow-left";

bbutt.appendChild(bicon);
topiconwrap.appendChild(bbutt);
});
