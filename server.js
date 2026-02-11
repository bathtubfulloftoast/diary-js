import express from 'express';
import { handler as ssrHandler } from './dist/server/entry.mjs';

import ylist from './functions/yearlist.js';



const app = express();

app.get('/api/yearlist', ylist);

const base = '/';
app.use(base, express.static('dist/client/'));
app.use(ssrHandler);

app.listen(4321);
