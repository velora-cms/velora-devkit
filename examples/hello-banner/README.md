# Hello Banner

A Velora section plugin (`com.example.hello-banner`), scaffolded with
`npm create velora-plugin`.

## Commands

- `npm run dev` — Vite dev server (the `velora-dev` sandbox's hot-reload
  target)
- `npm run build` — typecheck, then produce `dist/remoteEntry.js`
- `npm run preview` — serve the built remote for sideload testing
- `npm test` — runs `src/plugin.test.ts`, which checks your manifest
  against the SDK's own `validatePluginManifest` — the same check the
  Velora registry runs at install time. Extend this file as you add
  contributions; don't delete it.

## Where to go from here

- `src/plugin.tsx` is your plugin's manifest — the default export a
  Velora host installs. Edit the example contribution to make it yours.
- `src/plugin.test.ts` is your starter test. Keep it green, and add cases
  for any contribution logic you write (hooks, serializers, etc.).
- Keep `react`, `react-dom` and `@velora-cms/plugin-sdk` in vite.config.ts's
  `shared` block: your views run against the HOST's copies at runtime.
