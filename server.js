import express from 'express';
import { handler as ssrHandler } from './dist/server/entry.mjs';

import ylist from './functions/yearlist.js';
import diarypost from './functions/entry.js';
import file from './functions/file.js';
import entries from './functions/entries.js';

import shr from './functions/share.js';


const app = express();

app.get('/api/yearlist', ylist);
app.get('/api/entry', diarypost);
app.get('/api/file', file);
app.get('/api/entries', entries);

app.get('/share', shr);

const base = '/';
app.use(base, express.static('dist/client/'));
app.use(ssrHandler);

app.listen(4321);
