import fs from 'fs';
import mime from 'mime-types';
import entryconvert from './entryconvert.js';

export default async function swag(req, res) {
const {date: reqdate, file: reqfil, convert: convopt} = req.query;

if (!reqdate) {
return res.status(400).json({error: "no date requested."});
}

if (!reqfil) {
return res.status(400).json({error: "no file requested."});
}

const date = new Date(reqdate);
const day = String(date.getDate());
const month = String(date.getMonth() + 1); //January is 0!
const year = date.getFullYear();

const file = reqfil.replace(/^(\/|)(\.\/|\.\.\/)/g, "");

const extMatch = file.match(/\.([^.]+)$/);
const filext = extMatch ? extMatch[1].toLowerCase() : "";

if (isNaN(date)) {
return res.status(400).json({error:"invalid date"});
}

if(!reqfil) {
return res.status(400).json({error:"invalid file"});
}


try {
    const data = await fs.promises.readFile(`./entries/${year}/${month}/${day}/${file}`);
    var mimetype = mime.lookup(file)

let final = "there was an error.";

res.set('Content-Type', mimetype);
res.set('Content-Disposition', `inline; filename="${file.replace(/(.*)\//g,"")}"`);

if(convopt == "false") {
return res.status(200).send(data);
}

switch (filext) {
  case "html":
  case "htm":
    const htmlString = data.toString("utf-8");
    var replace = entryconvert(htmlString,date);
    res.status(200).send(replace);
    break;
  default:
    res.status(200).send(data);
}


} catch (err) {
    res.status(404).json({error:"couldnt read file"});
    // res.status(200).json(err);
}
};
