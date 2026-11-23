import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://vartmor.github.io',
  base: process.env.SITE_BASE ?? '/aeris-vision-site/',
  trailingSlash: 'always',
  integrations: [react()],
});
