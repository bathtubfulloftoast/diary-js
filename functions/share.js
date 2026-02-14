import fs from 'fs';
import 'dotenv/config';

const name = process.env.TITLE;
const baseURL = process.env.BASEURL || "/";

export default async function swag(req, res) {
const reqdate = req.query.date;

const date = new Date(reqdate);

if (isNaN(date)) {
return res.status(400).json({error:"invalid date"});
}

var day = String(date.getDate());
var month = String(date.getMonth() + 1);
var year = date.getFullYear();

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
