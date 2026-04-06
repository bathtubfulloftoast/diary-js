export default function calculateResize(srcWidth, srcHeight, max, min) {
let scaling = 0;
// 0, normal scaling
// 1, nearest

if ( (srcWidth < min)||(srcHeight < min) ) {
max = min;// it works though i think so, fuck you !!
scaling = 1;
} else if( !((srcWidth > max) || (srcHeight > max)) ) {// ok
return {
width: Math.round(srcWidth)||1,
height: Math.round(srcHeight)||1,
scaling
};
};

const ratio = Math.min(max / srcWidth, max / srcHeight);

return {
width: Math.round(srcWidth * ratio)||1,
height: Math.round(srcHeight * ratio)||1,
scaling
};
} // here i am laid down at the end of my rope, wishing i had never DONE MATH.
