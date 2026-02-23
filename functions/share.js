import fs from 'fs';
import 'dotenv/config';
import bdate from './date.js';

const name = process.env.TITLE;
const baseURL = process.env.BASEURL || "/";

export default async function swag(req, res) {
const reqdate = req.query.date;

const date = new Date(reqdate);
const {day,month,year} = bdate(date);

if (isNaN(date)) {
return res.status(400).json({error:"invalid date"});
}

const desc = `Entry for ${date.toLocaleString('default', { dateStyle: 'full' })}`;
const dest = `${baseURL}entry/#${year}-${month}-${day}`;

if (fs.existsSync(`./entries/${year}/${month}/${day}/entry.html`)) {

return res.status(200).send(`
<meta name="title" content="${name}" />
<meta property="og:title" content="${name}" />
<meta property="twitter:title" content="${name}" />
<meta name="description" content="${desc}" />
<meta property="og:description" content="${desc}" />
<meta property="twitter:description" content="${desc}" />
<meta property="og:type" content="website" />
<meta http-equiv="refresh" content="0; url=${dest}" />

<a href="${dest}">redirecting...</a>
`);
} else {
return res.status(404).send(`invalid entry\n<meta http-equiv="refresh" content="0; url=${baseURL}" />`);
}

};
