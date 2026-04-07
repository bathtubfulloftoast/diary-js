import calculateResize from '../resizecalc.js';
import { execSync } from 'child_process';

export default async function thumbnails({max,min,outfile,input}) {

var probe = await execSync(`ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of json "${input}"`);
probe = JSON.parse(probe).streams;

if (probe.length < 1) {
return {error:"no coverart to convert"};
}

probe = probe[0];

const iwid = probe.width;
const ihei = probe.height;

const resize = calculateResize(iwid,ihei,max,min);

var scale = `${resize.width}:${resize.height}`;


const cmd = `ffmpeg -hide_banner -loglevel error -y -i "${input}" -vf "scale=${scale}" -qscale 90 -f webp "${outfile}"`;

await execSync(cmd);
console.log(`[FFMPEG] ${cmd}`);

return {file:outfile};
};
