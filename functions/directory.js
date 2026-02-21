import fs from 'fs';
import 'dotenv/config';
import path from 'path';

const baseURL = process.env.BASEURL || "/";

export default async function swag(req, res) {
var {date: reqdate, dir: reqfil} = req.query;
reqfil = reqfil||"";

if (!reqdate) {
return res.status(400).json({error: "no date requested."});
}

const date = new Date(reqdate);
const day = String(date.getDate());
const month = String(date.getMonth() + 1); //January is 0!
const year = date.getFullYear();


var file = reqfil.replace(/\/+/g, "/");
file = file.replace(/(\/|)(\.\/|\.\.\/)/g, "./");

const cpath = `./entries/${year}/${month}/${day}/${file}`;

try {
var data = await fs.promises.readdir(cpath);
let poop = [];

data.forEach(myFunction);

function myFunction(item, index) {
poop.push({
name: item,
});
const extMatch = item.match(/\.([^.]+)$/);
let filext;

const isdir = fs.lstatSync(cpath+"/"+item).isDirectory();
if (!isdir) {
filext = extMatch ? extMatch[1].toLowerCase() : "";
poop[index].ext=filext;
} else {
poop[index].isdir=true;
}
}

res.status(200).json({parent:path.parse(file).dir, content:poop});
} catch (err) {
if(err.errno == -20) {
res.status(200).json({error: "not a directory"});
} else if (err.errno == -2) {
res.status(200).json({error: "directory doesnt exist"});
} else {
res.status(200).json(err);
}
}
};
