import fs from 'fs';
import mime from 'mime-types';
import htmlhandler from './converters/html.js';
import imageconverter from './converters/image.js';
import videothumbs from './converters/thumbnailgen.js';
import md5 from 'md5';
import 'dotenv/config';
import {makedir} from './caching.js';

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

const now = new Date(); // WHAT THE FUCK AM I DOING?????
const nday = String(now.getDate());
const nmonth = String(now.getMonth() + 1);
const nyear = now.getFullYear();

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

const filePath = `./entries/${year}/${month}/${day}/${dir}/${file}`.replace(/\/+/g, "/");

try {
    const data = await fs.promises.readFile(filePath);
    var mimetype = mime.lookup(file) || 'application/octet-stream';

res.set('Content-Type', mimetype);
res.set('Content-Disposition', `inline; filename="${file.replace(/(.*)\//g,"")}"`);
// res.set('Content-Type', "image/webp");

if(convopt == "false") {
return res.status(200).send(data);
}


switch (filext) {
  case "html":
  case "htm":
    makedir("html"); // WHAT THE FUCK IS THIS CODE WHAT THE FUCK AM I DOING, IM SO SCARED, IM SO FUCKING SCARED.
    var dest = `./cache/html/`+md5(filePath);
    if(fs.existsSync(dest) && `${nday}-${nmonth}-${nyear}` !== `${day}-${month}-${year}`) {
    const cdat = await fs.promises.readFile(dest);
    return res.status(200).send(cdat);
    } else {
    var html = htmlhandler(data,date,dir);
    await fs.promises.writeFile(dest, html);
    return res.status(200).send(html);
    }
    break;
  case "png":
  case "jpg":
  case "jpeg":
  case "webp":
  case "gif":
  case "avif":
  case "tiff":
    makedir("ithumbs"); // only thumbnails for now
    var dest = `./cache/ithumbs/`+md5(filePath);
    if(fs.existsSync(dest)) {
    const cdat = await fs.promises.readFile(dest);
    res.set('Content-Type', "image/webp");
    return res.status(200).send(cdat);
    } else {
    var image = await imageconverter({data:data,width:1000,height:1000,res:res});
    await fs.promises.writeFile(dest, image);
    return res.status(200).send(image);
    }
    break;
  case "mp4":
  case "webm":
  case "mov":
    const thumbgen = req.query.thumbnail;
    if (thumbgen == "true") {
    makedir("vthumbs");
    var dest = `./cache/vthumbs/`+md5(filePath);

    if(fs.existsSync(dest)) {
      const cdat = await fs.promises.readFile(dest);
      res.set('Content-Type', "image/webp");
      return res.status(200).send(cdat);
    } else {
      const thumbnail = await videothumbs(filePath);
      if(thumbnail.error) {
      return res.status(404).json(thumbnail);
      } else {
      const thumbdat = await fs.promises.readFile(thumbnail.file);
      var image = await imageconverter({data:thumbdat,width:1280,height:720,res:res});
      await fs.promises.writeFile(dest, image);
      return res.status(200).send(image);
      }
    }
    } else {
    res.status(200).send(data);
    }
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
