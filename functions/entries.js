import fs from 'fs';
import { glob } from 'glob'

export default async function swag(req, res) {
    const reqyear = req.query.year;
    if(/[^0-9]/g.test(reqyear)) {
    return res.status(400).json({error:"invalid year"});
    }
    if(!reqyear){
    return res.status(400).json({error:"invalid year"});
    }

    const files = await glob(`./entries/${reqyear}/*/*/entry.html`);

    if(files.length == 0) {
    return res.status(404).json({error:"no valid entries for given year"});
    }


    var file = files.map(function(x){ return x.replace(/entries\/[0-9]*\//g,"") });
    file = file.map(function(x){ return x.replace(/\/entry.html/g,"") });
    file = file.map(function(x){ return x.replace(/\//g,"-") });
    file.sort((a, b) => {
        const [a1, a2] = a.split("-").map(Number);
        const [b1, b2] = b.split("-").map(Number);

        if (a1 !== b1) {
            return a1 - b1;
        }
        return a2 - b2;
    });



    res.status(200).json(  file  );


};
