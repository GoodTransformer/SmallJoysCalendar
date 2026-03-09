import { defineConfig } from 'astro/config';

const repoName = 'SmallJoysCalendar';
const isProjectSite = true;
const site = 'https://goodtransformer.github.io';
const configuredBase =
  process.env.BASE_PATH ?? (isProjectSite ? `/${repoName}` : '/');

export default defineConfig({
  site,
  base: configuredBase,
  output: 'static',
  trailingSlash: 'ignore'
});
