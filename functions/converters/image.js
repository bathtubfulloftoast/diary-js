import sharp from 'sharp';


export default async function imageconvert({data,width,height,res}) {

// const ibuff = await data.arrayBuffer();
const metadata = await sharp(data).metadata();

const iwid = metadata.width;
const ihei = metadata.height;
const delay = metadata.delay;
const format = metadata.format;

if(iwid < width) {
width = iwid;
}

if(ihei < height) {
height = ihei;
}

if(format == "gif" && delay.length > 1) {
res.set('Content-Type', "image/gif");
return data;
}

const baseImage = await sharp(data).resize({ width: width, height: height, fit: "inside"});


res.set('Content-Type', "image/webp");
const final = await baseImage
.toFormat("webp")
.toBuffer();

return final;
};
