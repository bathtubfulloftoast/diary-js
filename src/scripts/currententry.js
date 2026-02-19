document.addEventListener("DOMContentLoaded", async function() {
const baseURL = document.head.getAttribute("baseurl");

const date = new Date(); // i dont know if i should export the date stuff into a function that just grabs the year and shit, its really important for a fucking diary but idunno...
var day = String(date.getDate()); // maybe in the future
var month = String(date.getMonth() + 1); // januare is pooopyyyy dumb poop poop
var year = date.getFullYear(); // kids dont copy and paste the same code for multiple years

const response = await fetch(baseURL+"api/entries?year="+year);
const data = await response.json();

const logo = document.getElementById("title");

if (data.indexOf(`${month}-${day}`) !== -1) {
const link = document.createElement("a");
link.href=`${baseURL}entry/#${month}/${day}/${year}`;
link.innerHTML = logo.innerHTML;
logo.innerHTML="";
logo.appendChild(link);
}
});
