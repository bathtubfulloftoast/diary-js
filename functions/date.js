export default function basicdate(d) {
const date = new Date(d);
var da = String(date.getDate());
var m = String(date.getMonth() + 1); //January is 0!
var y = date.getFullYear();

return {day:da,month:m,year:y}
}
