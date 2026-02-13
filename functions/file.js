import fs from 'fs';
import mime from 'mime-types';

export default async function swag(req, res) {
const reqdate = req.query.date;
const reqfil = req.query.file;

const date = new Date(reqdate);
var day = String(date.getDate());
var month = String(date.getMonth() + 1); //January is 0!
var year = date.getFullYear();

const file = reqfil.replace(/^(\.\/|\.\.\/)/g, "");

if (isNaN(date)) {
return res.status(400).json({error:"invalid date"});
}



try {
    const data = fs.readFileSync(`./entries/${year}/${month}/${day}/${file}`);
    var mimetype = mime.lookup(file)

    res.set('Content-Type', mimetype);
    res.set('Content-Disposition', `inline; filename="${file.replace(/(.*)\//g,"")}"`);

    res.status(200).send(data);
} catch (err) {
    res.status(404).json({error:"couldnt read file"});
    // res.status(200).json(err);
}
};
