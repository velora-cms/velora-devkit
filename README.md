# Velora Devkit

The plugin developer kit for [Velora](https://velora-cms.com): scaffold,
validate, build, and publish Velora plugins — everything runs from npm,
no source checkout required.

## Quickstart

```sh
# 1. Scaffold a plugin (pick a type: datatype, section, integration,
#    utility, theme, template, bundle)
npx create-velora-plugin my-plugin

# 2. Validate and build it
cd my-plugin
npx velora-plugin validate
npx velora-plugin build

# 3. Publish it to the Velora marketplace
npx velora-plugin publish
```

Publishing targets the hosted marketplace at
<https://marketplace.velora-cms.com> — create a developer account there
first. Reviewed plugins are signed and appear as **Verified**; every
locally installed Velora site connects to this marketplace out of the
box.

## Learn more

- **Plugin SDK docs** — <https://docs.velora-cms.com> (Plugin SDK section:
  the datatype contract, storage APIs, hooks, admin sections, theming)
- **Build-a-plugin tutorial** — on the docs site
- **The SDK on npm** — [`@velora-cms/plugin-sdk`](https://www.npmjs.com/package/@velora-cms/plugin-sdk)

## What lives where

| npm package | What it is |
|---|---|
| `create-velora-plugin` | The scaffolder |
| `velora-plugin` | Validate / build / publish CLI |
| `@velora-cms/plugin-sdk` | The runtime SDK your plugin imports |
| `@velora-cms/ui` | The host's component library (your admin UI matches the CMS automatically) |
| `@velora-cms/design-tokens` | The token system behind theming |

This repository hosts the devkit's issue tracker and release notes; the
code ships as the npm packages above. Apache-2.0.
