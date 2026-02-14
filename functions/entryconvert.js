import 'dotenv/config';

const baseURL = process.env.BASEURL || "/";

export default function entryconvert(data, date) {
var day = String(date.getDate());
var month = String(date.getMonth() + 1); //January is 0!
var year = date.getFullYear();

var replace = data.replace(/(src|href|poster)\s*=\s*"([^"]+)"/g, function(match, attr, srcValue) {
    srcValue = srcValue.replace(/^(\.\/|\.\.\/)/g, "");

    if(/(http|https):\/\//g.test(srcValue)) {
        return  `${attr}="${srcValue}"`;
    } else {
        return `${attr}="${baseURL}api/file?date=${month}/${day}/${year}&file=` + srcValue + '"';
    }

});

replace = replace.replace(/<!--(.*)-->/gs,"");
replace = replace.replace(/<script>(.*)<\/script>/gs,"");

return replace;
}
