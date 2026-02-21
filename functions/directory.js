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
let content = [];

data.forEach(myFunction);

function myFunction(item, index) {
const ipath = cpath+"/"+item;
content.push({
file: item,
});

const isdir = fs.lstatSync(ipath).isDirectory();
const parse = path.parse(item);
var stats = fs.statSync(ipath)

if (!isdir) {

// console.log(stats);

content[index].name=parse.name;
content[index].ext=parse.ext.replace(/^\./g,"");
content[index].size=stats.size;


} else {
const subdir = fs.readdirSync(ipath);
content[index].name= item;
content[index].isdir= true;
content[index].files = subdir.length;
}

content[index].ctime=Math.floor(stats.ctimeMs); //unix timestamp in MS
content[index].mtime=Math.floor(stats.mtimeMs); //unix timestamp in MS

}

res.status(200).json({parent:path.parse(file).dir, content:content});
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
