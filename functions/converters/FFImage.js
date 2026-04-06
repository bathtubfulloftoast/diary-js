import calculateResize from '../resizecalc.js';
import { execSync } from 'child_process';

export default async function imageconvert({max,min,outfile,input}) {

var probe = await execSync(`ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of json "${input}"`);
probe = JSON.parse(probe).streams[0];

const iwid = probe.width;
const ihei = probe.height;

const resize = calculateResize(iwid,ihei,max,min);

var scale = `${resize.width}:${resize.height}`;

if (resize.scaling == 1) {
scale = scale+":flags=neighbor";
}

const cmd = `ffmpeg -hide_banner -loglevel error -y -i "${input}" -vf "scale=${scale}" -loop 0 -pix_fmt yuva420p -qscale 75 -f webp "${outfile}"`;

await execSync(cmd);
console.log(`[FFMPEG] ${cmd}`);

return outfile;
};
