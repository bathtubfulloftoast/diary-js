document.addEventListener("DOMContentLoaded", async function() {
    const baseURL = document.head.getAttribute("baseurl");

    let hash = window.location.hash;
    hash = hash.substring(1);
    hash = decodeURI(hash);

    const dayName = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    if(/[^0-9]/g.test(hash)) {
        alert("invalid year");
        window.location.replace("/");
        return;
    }

    const response = await fetch('/entries.json');
    // const response = await fetch(baseURL+`api/entries?year=${hash}`);

    if(!response.ok) {
        alert(`couldnt grab entries status code: ${response.status}`);
        window.location.replace("/");
        return;
    }

    const data = await response.json();

    if(data.error) {
        alert(data.error);
        window.location.replace("/");
        return;
    }

    const wrap = document.getElementById("dates");

    function createCalendar(elem, year, month) {

        let mon = month - 1; // months in JS are 0..11, not 1..12
        let d = new Date(year, mon);

        let table = document.createElement("div");

        const title = document.createElement("h1");
        title.innerHTML=d.toLocaleString('default', { month: 'long' });

        table.appendChild(title);

        // <td> with actual dates
        while (d.getMonth() == mon) {
            const cdate = d.getDate();
            const cday = d.getDay();
            const cmonth = month;

            const button = document.createElement("div");

            let classname = "button";
            if(cday == 0 || cday == 6) {
            classname = classname + " weekend"
            }


            if (data.indexOf(`${cmonth}-${cdate}`) !== -1) {
                button.className = classname+" valid";
                const clickable = document.createElement("a");
                clickable.href=`${baseURL}entry#${cmonth}/${cdate}/${hash}`;
                clickable.innerHTML = cdate;
                button.title = dayName[cday];
                button.appendChild(clickable);
            } else {
                button.className = classname+" invalid";
                button.innerHTML = cdate;
            }
            table.appendChild(button)



            d.setDate(d.getDate() + 1);
        }

        elem.appendChild(table);
    }

    function getDay(date) { // get day number from 0 (monday) to 6 (sunday)
        let day = date.getDay();
        if (day == 0) day = 7; // make Sunday (0) the last day
        return day - 1;
    }

    for (let i = 1; i < 13; i++) {
        const poop = document.createElement("div");

        createCalendar(poop, hash, i);

        wrap.appendChild(poop);
    }

    // this is so far from my comfort zone thank you javascript.info
    // https://javascript.info/task/calendar-table
});
