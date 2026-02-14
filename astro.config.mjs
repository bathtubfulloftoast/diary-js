// @ts-check
import { defineConfig } from 'astro/config';
import 'dotenv/config';

import node from '@astrojs/node';

const baseURL = process.env.BASEURL || "/";

// https://astro.build/config
export default defineConfig({
  publicDir: './branding',
  base: baseURL,
  integrations: [
  (await import("astro-compress")).default({Image: false}),
  ],
  adapter: node({
    mode: 'middleware',
  })
});
