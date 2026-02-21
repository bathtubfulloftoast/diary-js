import fs from 'fs';

export function makedir(dir) {
try {
  if (!fs.existsSync("./cache/"+dir)) {
    fs.mkdirSync("./cache/"+dir);
  }
} catch (err) {
  console.error(err);
}
}
