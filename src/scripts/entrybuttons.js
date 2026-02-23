import back from '/src/scripts/entry buttons/back.js';
import edit from '/src/scripts/entry buttons/edit.js';
import directory from '/src/scripts/entry buttons/dir.js';
import share from '/src/scripts/entry buttons/share.js';
import entrynav from '/src/scripts/entry buttons/entrybrowse.js';


let hash = window.location.hash;
hash = hash.substring(1);
hash = decodeURI(hash);





document.addEventListener("DOMContentLoaded", async function() {
    const baseURL = document.head.getAttribute("baseurl");



    const wrapper = document.getElementById("topicons");

    back(hash,wrapper,baseURL);
    edit(wrapper,hash);
    directory(wrapper,baseURL,hash);
    share(wrapper,baseURL,hash);
    entrynav(wrapper,hash,baseURL); // quick and dirty solution.
//(they did use DOS until fucking XP okay okay windows NT but youre browsing sourcecode you know this you fucking loser)

    document.getElementById("totop").addEventListener("click", function(event) {
    event.preventDefault();
    window.scrollTo(0, 0);
    })


});
