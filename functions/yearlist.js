import fs from 'fs';

export default async function swag(req, res) {

let re = /[^0-9]/g;
let fn = re.exec.bind(re);

fs.readdir("./entries", (err, files) => {

const filtered = files.filter(e => !fn(e));

res.status(200).json(  filtered  );
});

};
