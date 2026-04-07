import { execSync } from 'child_process';

export default async function imageconvert({outfile,input}) {

const cmd = `ffmpeg -hide_banner -loglevel error -y -i "${input}" -b:a 40K -map_metadata -1 -f opus "${outfile}"`
await execSync(cmd);
console.log(`[FFMPEG] ${cmd}`);

return outfile;
};
