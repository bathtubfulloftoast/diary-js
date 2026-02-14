export default async function getsheet(cssfile) {
if(window.localStorage.getItem("customcss") == "false" ) {
return;
}

const response = await fetch(cssfile);

if(response.ok) {
const stylesheet = document.createElement("link");
stylesheet.rel="stylesheet";
stylesheet.href=cssfile;

document.head.appendChild(stylesheet);
} else {
await window.localStorage.setItem("customcss", false);
}

}
