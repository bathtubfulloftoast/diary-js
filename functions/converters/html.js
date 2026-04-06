import 'dotenv/config';
import path from 'path'
import * as cheerio from 'cheerio';

const baseURL = process.env.BASEURL || "/";

function entryconvert(data, date, dir) {
var day = String(date.getDate());
var month = String(date.getMonth() + 1); //January is 0!
var year = date.getFullYear();
// var replace;

function srconv(element,type) {
var osrc=element.attr(type);

if(osrc && !(/^(http|https):\/\//g.test(osrc))) {
var nocapes = osrc.split('?')[0];

const parse = path.parse(nocapes);

let params = "";
if (osrc.includes("?")) {
params = osrc.split("?").pop();
}

params = new URLSearchParams(params);
// params = params;
params.set("date",`${month}/${day}/${year}`)
params.set("dir",`${dir+"/"+parse.dir}`)
params.set("file",parse.base)
params=params.toString();

var nsrc = baseURL+"api/file?"+params;

element.attr(type, nsrc);
}
}

const $ = cheerio.load(data);

$("video").each(function() {



const sources = $(this).find("source");

var vsrc;
if(sources) {
for (var source of sources) {
if (source.attribs.src) {
vsrc = source.attribs.src;
break;
}
}
}

var osrc=$(this).attr("poster");
if($(this).attr("src")) {
vsrc = $(this).attr("src");
};

if(!vsrc) {
return;
}

if (osrc && !(/^(http|https):\/\//g.test(osrc)) ) {
const parse = path.parse(osrc);
$(this).attr("poster", `${baseURL}api/file?date=${month}/${day}/${year}&dir=${dir+"/"+parse.dir}&file=${parse.base}`);
} else if (vsrc && (/^(http|https):\/\//g.test(vsrc)) ) {} else if(!osrc) {
const parse = path.parse(vsrc);
$(this).attr("poster", `${baseURL}api/file?date=${month}/${day}/${year}&dir=${dir+"/"+parse.dir}&file=${parse.base}&thumbnail=true`);
}
});

$("*").each(function() {
srconv($(this),"src");
srconv($(this),"href");
});

function isComment(index, node) {
return node.type === 'comment'
}
$('body').contents().filter(isComment).remove();

$("style").each(function() {
// $(this).replaceWith("<!--style tags arent supported, please link a css file!-->\n");
// $(this).text("test");
const htreplace = $(this).text();

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

$(this).text(csreplace);
});


$('head').html( $('head').html().replaceAll("\n","") );
if($('head').html().length > 1) {
return $.html();
} else {
return $('body').html();
}

}


export default function html(data,date,dir) {
const htmlString = data.toString("utf-8");
var replace = entryconvert(htmlString,date,dir);
return replace;
}
