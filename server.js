import express from 'express';
import 'dotenv/config';
import { handler as ssrHandler } from './dist/server/entry.mjs';

import ylist from './functions/yearlist.js';
import file from './functions/file.js';
import entries from './functions/entries.js';

import shr from './functions/share.js';

const port = process.env.PORT || 4321;
const baseURL = process.env.BASEURL || "/";

const app = express();

app.get(baseURL+'api/yearlist', ylist);
app.get(baseURL+'api/file', file);
app.get(baseURL+'api/entries', entries);

app.get(baseURL+'share', shr);

const base = baseURL;
app.use(base, express.static('dist/client/'));
app.use(ssrHandler);

app.use((req, res) => {
res.status(404).sendFile('dist/client/404.html', { root: '.' });
});

app.listen(port);
console.log(`started server at http://localhost:${port}`);
