import { type SectionPluginManifest } from '@velora-cms/plugin-sdk'
import { SectionView } from './views'

const plugin: SectionPluginManifest = {
  id: 'com.example.hello-banner',
  name: 'Hello Banner',
  version: '0.1.0',
  type: 'section',
  description: 'Minimal example plugin: adds a hello banner admin section',
  author: 'Velora examples',
  license: 'MIT',
  cmsVersion: '^0.9.0',
  databaseCompatibility: {
    storageType: 'simple',
    supported: ['postgresql', 'mysql', 'sqlite'],
  },
  permissions: {
    needsStructuredData: false,
    needsExternalNetwork: false,
    needsFileSystemAccess: false,
  },
  contributions: {
    adminSections: [
      {
        id: 'hello-banner',
        name: 'Hello Banner',
        icon: 'layout-grid',
        view: SectionView,
      },
    ],
    apiRoutes: [
      {
        method: 'GET',
        // Mounted under /api/plugins/com.example.hello-banner/… by the host, so two
        // plugins can never collide on a path.
        path: '/status',
        handler: () => ({ ok: true }),
      },
    ],
    // Document types this plugin provisions at install (the server mints
    // ids) — only 'section' and 'template' plugins may declare this
    // contribution. Remove this array entirely if your plugin doesn't
    // need one. The datatypeId below is the built-in Text data type's id
    // (packages/api-schemas/src/data-type-config.schema.ts).
    documentTypes: [
      {
        name: 'Example Item',
        icon: 'file',
        kind: 'page',
        fields: [{ id: 'title', name: 'Title', datatypeId: 'b1e00000-0000-4000-8000-000000000001' }],
        tabs: [],
        treeRules: { allowedAtRoot: true, allowedParentTypes: [], allowedChildTypes: [] },
      },
    ],
  },
}

export default plugin
