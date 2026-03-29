import fs from 'fs';
import os from 'os';
import path from 'path';
import { execSync } from 'child_process';

export default async function thumbnails(dir) {
const tmp = os.tmpdir();
const parse = path.parse(dir);

const outfile = tmp+"/ndiary-"+parse.name+".png"
console.log(outfile);

const cmd = await execSync(`ffmpeg -y -ss 00:00 -t 00:01 -i "${dir}" -frames:v 1 -q:v 2 "${outfile}"`);

if(fs.existsSync(outfile)) {
return {file: outfile};
}else {
return {error:"outfile not found"}
}
};
