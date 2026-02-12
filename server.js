import express from 'express';
import { handler as ssrHandler } from './dist/server/entry.mjs';

import ylist from './functions/yearlist.js';
import entry from './functions/entry.js';
import file from './functions/file.js';

import shr from './functions/share.js';


const app = express();

app.get('/api/yearlist', ylist);
app.get('/api/entry', entry);
app.get('/api/file', file);

app.get('/share', shr);

const base = '/';
app.use(base, express.static('dist/client/'));
app.use(ssrHandler);

app.listen(4321);
