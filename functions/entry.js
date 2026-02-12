import fs from 'fs';

export default async function swag(req, res) {
const reqdate = req.query.date;

const date = new Date(reqdate);
var day = String(date.getDate());
var month = String(date.getMonth() + 1); //January is 0!
var year = date.getFullYear();

if (isNaN(date)) {
return res.status(400).json({error:"invalid date"});
}



try {
    const data = fs.readFileSync(`./entries/${year}/${month}/${day}/entry.html`, 'utf8');

    var replace = data.replace(/src\s*=\s*"([^"]+)"/g, function(match, srcValue) {
        srcValue = srcValue.replace(/^(\.\/|\.\.\/)/g, "");

        if(/(http|https):\/\//g.test(srcValue)) {
        return  'src="' + srcValue + '"';
        } else {
        return 'src="' + `/api/file?date=${year}-${month}-${day}&file=` + srcValue + '"';
        }
    });

    res.status(200).send(replace);
} catch (err) {
    // res.status(200).json({error:"couldnt read file"});
    res.status(200).json(err);
}
};
