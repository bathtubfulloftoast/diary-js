import 'dotenv/config';
import path from 'path'
import * as cheerio from 'cheerio';

const baseURL = process.env.BASEURL || "/";

function entryconvert(data, date, dir) {
var day = String(date.getDate());
var month = String(date.getMonth() + 1); //January is 0!
var year = date.getFullYear();
// var replace;

const $ = cheerio.load(data);

$("*").each(function() {
var osrc=$(this).attr("src");

if(osrc && !(/^(http|https):\/\//g.test(osrc)) ) {
const parse = path.parse(osrc);
var nsrc = `${baseURL}api/file?date=${month}/${day}/${year}&dir=${dir+"/"+parse.dir}&file=${parse.base}`;
$(this).attr("src", nsrc);
}

});

$("*").each(function() {
var osrc=$(this).attr("href");

if(osrc && !(/^(http|https):\/\//g.test(osrc) || /^#/g.test(osrc)) ) {
const parse = path.parse(osrc);
var nsrc = `${baseURL}api/file?date=${month}/${day}/${year}&dir=${dir+"/"+parse.dir}&file=${parse.base}`;
$(this).attr("href", nsrc);
}

});

$("video").each(function() {
var osrc=$(this).attr("poster");

if(osrc && !(/^(http|https):\/\//g.test(osrc)) ) {
const parse = path.parse(osrc);
var nsrc = `${baseURL}api/file?date=${month}/${day}/${year}&dir=${dir+"/"+parse.dir}&file=${parse.base}`;
$(this).attr("href", nsrc);
}

});

function isComment(index, node) {
return node.type === 'comment'
}
$('body').contents().filter(isComment).remove();

$("style").each(function() {
$(this).replaceWith("<!--style tags arent supported, please link a css file!-->\n");
});

return $('body').html();
}


export default function html(data,date,dir) {
const htmlString = data.toString("utf-8");
var replace = entryconvert(htmlString,date,dir);
return replace;
}
