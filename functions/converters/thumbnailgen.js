import calculateResize from '../resizecalc.js';
import { execSync } from 'child_process';

export default async function thumbnails({max,min,outfile,input}) {

var probe = await execSync(`ffprobe -v error -select_streams v:0 -show_entries stream=width,height -show_entries format=duration -show_entries stream_side_data=rotation -of json "${input}"`);
probe = JSON.parse(probe);


var streams = probe.streams;
var duration = probe.format.duration;

if (streams.length > 1) {
return {error:"no video to convert "};
}

streams = streams[0];

var iwid = streams.width;
var ihei = streams.height;

if (streams.side_data_list) {
var rotation = streams.side_data_list[0].rotation;
rotation = Math.abs(rotation);

if(rotation == 90) {// this is not a good way to do this, but it ok
var iwid = streams.height;
var ihei = streams.width;
}
}

const resize = calculateResize(iwid,ihei,max,min);

var scale = `${resize.width}:${resize.height}`;

const middle = Math.round(duration/2);

// i know the -ss -t is redundant, i just want to ENSURE, it doesnt encode more than it needs to.
const cmd = `ffmpeg -hide_banner -loglevel error -y -ss ${middle} -to ${middle+1} -i "${input}" -vf "scale=${scale}" -frames:v 1 -q:v 2 -qscale 90 -f webp "${outfile}"`;

await execSync(cmd);
console.log(`[FFMPEG] ${cmd}`);

return {file:outfile};
};
