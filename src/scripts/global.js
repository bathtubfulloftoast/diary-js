import getsheet from './getcss.js';
const baseURL = document.head.getAttribute("baseurl");

console.log("Novas Diary\nhttps://git.gay/bathtubfulloftoast/diary/");
getsheet(baseURL+"custom.css"); // this is to ensure the custom css is loaded last and properly applied..
