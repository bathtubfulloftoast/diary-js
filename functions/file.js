import fs from 'fs';
import mime from 'mime-types';
import entryconvert from './converters/html.js';
import 'dotenv/config';

import { EventEmitter } from 'events';
EventEmitter.defaultMaxListeners = 0; // iunno what the FUCK im doing.

const baseURL = process.env.BASEURL || "/";

export default async function swag(req, res) {
const {date: reqdate, file: reqfil, dir: reqdir, convert: convopt} = req.query;

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

var file = reqfil.replace(/\/+/g, "/");
file = file.replace(/(\/|)(\.\/|\.\.\/)/g, "./");

if(reqdir) {
var dir = reqdir.replace(/\/+/g, "/");
dir = dir.replace(/(\/|)(\.\/|\.\.\/)/g, "./");
dir = dir.replace(/(^\/|\/$)/g, "");
} else {
var dir = "";
}

const extMatch = file.match(/\.([^.]+)$/);
const filext = extMatch ? extMatch[1].toLowerCase() : "";

if (isNaN(date)) {
return res.status(400).json({error:"invalid date"});
}

try {
    const data = await fs.promises.readFile(`./entries/${year}/${month}/${day}/${dir}/${file}`);
    var mimetype = mime.lookup(file) || 'application/octet-stream';

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
    var replace = entryconvert(htmlString,date,dir);
    res.status(200).send(replace);
    break;
  default:
    res.status(200).send(data);
}


} catch (err) {
  if(err.errno == -21) {// gonna hope this error number ONLY applies to this.
  res.redirect(301, baseURL+"directory"+`?date=${reqdate}&dir=${dir}/${reqfil}`)
  } else if (err.errno == -2) {
  res.status(404).json({error:"file doesnt exist"});
  } else {
  res.status(200).json(err);
  }
}
};
