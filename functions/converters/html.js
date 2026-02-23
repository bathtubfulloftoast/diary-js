import 'dotenv/config';
import path from 'path'

const baseURL = process.env.BASEURL || "/";

function entryconvert(data, date, dir) {
var day = String(date.getDate());
var month = String(date.getMonth() + 1); //January is 0!
var year = date.getFullYear();
var replace;

var htreplace = data.replace(/(src|href|poster)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g, function(match, attr, dquot, squot, nquot) {

    let srcValue = dquot || squot || nquot;

    if (!srcValue) { return match} ;

    srcValue = srcValue.replace(/^(\.\/|\.\.\/)/g, "");

    if(/^(http|https):\/\//g.test(srcValue) || /^#/g.test(srcValue)) {
    return  `${attr}="${srcValue}"`;
    } else {
    const parse = path.parse(srcValue);

    return `${attr}="${baseURL}api/file?date=${month}/${day}/${year}&dir=${dir+"/"+parse.dir}&file=` + parse.base + '"';
    }

});

var csreplace = htreplace.replace(/(url)\s*\(\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))\s*\)/g, function(match, attr, dquot, squot, nquot) {

    let srcValue = dquot || squot || nquot;

    if (!srcValue) { return match} ;

    srcValue = srcValue.replace(/^(\.\/|\.\.\/)/g, "");

    if(/^(http|https):\/\//g.test(srcValue) || /^#/g.test(srcValue)) {
    return  `${attr}("${srcValue}")`;
    } else {
    const parse = path.parse(srcValue);

    return `${attr}("${baseURL}api/file?date=${month}/${day}/${year}&dir=${dir+"/"+parse.dir}&file=` + parse.base + '")';
    }

});

replace = csreplace.replace(/<!--(.*?)-->/gs,"");

return replace;
}


export default function html(data,date,dir) {
const htmlString = data.toString("utf-8");
var replace = entryconvert(htmlString,date,dir);
return replace;
}
