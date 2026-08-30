# Hello Banner

A minimal Velora **section plugin** (`com.example.hello-banner`) — it adds
an admin section with a hello-world panel, one tiny API route, and one
document type. Scaffolded with `npm create velora-plugin`, then kept
exactly as generated so you can see what the tool gives you.

## Run it

```sh
npm install
npx velora-plugin validate   # the 8 checks the marketplace runs on submission
npx velora-plugin build      # produces velora-package/ (what publish uploads)
npm test                     # manifest check against the SDK's validator
npm run dev                  # Vite dev server for the velora-dev sandbox
```

## The files

| File | What it is |
|---|---|
| `src/plugin.tsx` | **The manifest** — the default export a Velora host installs. Everything the CMS knows about your plugin comes from this object. |
| `src/views.tsx` | The React component rendered inside the admin for your section. |
| `src/plugin.test.ts` | Starter test: validates the manifest with the SDK's `validatePluginManifest` — the same check the registry runs at install. Extend it, don't delete it. |
| `vite.config.ts` | Module Federation build. `react`, `react-dom` and `@velora-cms/plugin-sdk` are in its `shared` block so your views run against the **host's** copies at runtime — never bundle them. |
| `index.html` | Only used by `npm run dev`/`preview` for local testing. |
| `tsconfig.json` | Strict TypeScript, JSX via React 19's automatic runtime. |

## The manifest, property by property (`src/plugin.tsx`)

```ts
const plugin: SectionPluginManifest = {
```
The type comes from `@velora-cms/plugin-sdk`. Each plugin **type** has its
own manifest type (`DatatypePluginManifest`, `ThemePluginManifest`, …)
that only allows the contributions that type may make — the compiler
stops you from, say, declaring `adminSections` in a datatype plugin.

| Property | Meaning |
|---|---|
| `id` | Reverse-domain, globally unique (`com.example.hello-banner`). Used for storage namespaces, API route prefixes, and marketplace identity. Never change it after publishing. |
| `name`, `description`, `author`, `license` | What the admin and the marketplace display. |
| `version` | Semver of *your plugin*. Bump on every publish. |
| `type` | `'section'` here. One of `datatype`, `section`, `template`, `theme`, `integration`, `utility`, `bundle`. Decides which contributions are allowed. |
| `cmsVersion` | Semver range of Velora versions you support. Hosts refuse to install a plugin whose range excludes them. |
| `databaseCompatibility.storageType` | `'simple'` = you only use the JSON key-value `SimpleStorageAPI` (works on every database). `'structured'` = you need the query-builder `StructuredStorageAPI` (opt-in, reviewed). |
| `databaseCompatibility.supported` | Which databases you've tested: any of `postgresql`, `mysql`, `sqlite`. With `'simple'` storage you can declare all three safely. |
| `permissions.needsStructuredData` | Must be `true` if you use `StructuredStorageAPI`. |
| `permissions.needsExternalNetwork` | `true` if your server-side code calls out to the internet — shown to site owners at install. |
| `permissions.needsFileSystemAccess` | `true` if you read/write files outside the media API. Rare. |
| `contributions` | What the plugin adds to the CMS — see below. |

### `contributions.adminSections`

```ts
{ id: 'hello-banner', name: 'Hello Banner', icon: 'layout-grid', view: SectionView }
```
Adds an entry to the admin's navigation. `id` is unique within your
plugin; `icon` is a short icon name the admin shows next to it; `view` is the
React component to render (from `src/views.tsx`). Only `section` plugins
may contribute admin sections.

### `contributions.apiRoutes`

```ts
{ method: 'GET', path: '/status', handler: () => ({ ok: true }) }
```
Server-side endpoints. The host mounts them under
`/api/plugins/<your-plugin-id>/…` — so this one answers at
`/api/plugins/com.example.hello-banner/status` — which means two plugins
can never collide on a path. The handler's return value is serialized as
JSON.

### `contributions.documentTypes`

```ts
{
  name: 'Example Item', icon: 'file', kind: 'page',
  fields: [{ id: 'title', name: 'Title', datatypeId: 'b1e0…0001' }],
  tabs: [],
  treeRules: { allowedAtRoot: true, allowedParentTypes: [], allowedChildTypes: [] },
}
```
Document types your plugin **provisions at install** (the server mints
their ids). `kind` is `'page'` (lives in the content tree) or
`'element'` (reusable block). `fields` reference a data type by
`datatypeId` — the value shown is the built-in **Text** data type; every
built-in id is listed in `@velora-cms/api-schemas`. `tabs` groups fields
in the editor (empty = one default tab). `treeRules` says where editors
may create it: at the root, under which parent types, and which children
it accepts. Delete this whole array if your plugin doesn't need a
document type — only `section` and `template` plugins may declare it.

## The view (`src/views.tsx`)

```tsx
import { Panel } from '@velora-cms/plugin-sdk'
export function SectionView() {
  return <Panel><p>Hello Banner — your admin section starts here.</p></Panel>
}
```
A plain React component. Build it from `@velora-cms/plugin-sdk` /
`@velora-cms/ui` components so it automatically matches the active admin
theme (the host's design tokens flow in as CSS variables). Use logical
CSS properties (`margin-inline-start`, not `margin-left`) — RTL admins
are first-class.

## Make it yours

1. Change `id`, `name`, `author`, `description` — and the `id` inside
   `adminSections` if you rename the section.
2. Replace the view's markup. Need persistence? Ask the host for the
   `SimpleStorageAPI` (see the Plugin SDK docs → Storage).
3. `npx velora-plugin validate` after every change; `npm test` keeps the
   manifest honest.
4. When it's ready: `export VELORA_PUBLISH_TOKEN=…` then
   `npx velora-plugin publish` (see the repo README for the full flow).
