const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const outputPath = path.join(root, 'src', 'static-assets.generated.ts')

function readBase64(relativePath) {
  const absPath = path.join(root, relativePath)
  return fs.readFileSync(absPath).toString('base64')
}

function readText(relativePath) {
  const absPath = path.join(root, relativePath)
  return fs.readFileSync(absPath, 'utf8')
}

const bootstrapIconsCss = readText('node_modules/bootstrap-icons/font/bootstrap-icons.css')
  .replace(
    /url\("\.\/fonts\/bootstrap-icons\.woff2\?[^"]+"\) format\("woff2"\),\s*url\("\.\/fonts\/bootstrap-icons\.woff\?[^"]+"\) format\("woff"\);/,
    'url("/assets/vendor/bootstrap-icons.woff2") format("woff2");\n  font-display: swap;'
  )

const assets = {
  '/assets/vendor/bootstrap.min.css': {
    contentType: 'text/css; charset=utf-8',
    encoding: 'utf8',
    body: readText('node_modules/bootstrap/dist/css/bootstrap.min.css'),
  },
  '/assets/vendor/bootstrap.bundle.min.js': {
    contentType: 'application/javascript; charset=utf-8',
    encoding: 'utf8',
    body: readText('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'),
  },
  '/assets/vendor/chart.umd.js': {
    contentType: 'application/javascript; charset=utf-8',
    encoding: 'utf8',
    body: readText('node_modules/chart.js/dist/chart.umd.js'),
  },
  '/assets/vendor/bootstrap-icons.css': {
    contentType: 'text/css; charset=utf-8',
    encoding: 'utf8',
    body: bootstrapIconsCss,
  },
  '/assets/vendor/bootstrap-icons.woff2': {
    contentType: 'font/woff2',
    encoding: 'base64',
    body: readBase64('node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff2'),
  },
  '/assets/app/add-points.css': {
    contentType: 'text/css; charset=utf-8',
    encoding: 'utf8',
    body: readText('web_assets/add-points.css'),
  },
  '/assets/app/add-points.js': {
    contentType: 'application/javascript; charset=utf-8',
    encoding: 'utf8',
    body: readText('web_assets/add-points.js'),
  },
  '/assets/app/rankings.css': {
    contentType: 'text/css; charset=utf-8',
    encoding: 'utf8',
    body: readText('web_assets/rankings.css'),
  },
  '/assets/app/rankings.js': {
    contentType: 'application/javascript; charset=utf-8',
    encoding: 'utf8',
    body: readText('web_assets/rankings.js'),
  },
  '/assets/app/students.js': {
    contentType: 'application/javascript; charset=utf-8',
    encoding: 'utf8',
    body: readText('web_assets/students.js'),
  },
  '/assets/app/import-points.js': {
    contentType: 'application/javascript; charset=utf-8',
    encoding: 'utf8',
    body: readText('web_assets/import-points.js'),
  },
  '/assets/app/points-records.js': {
    contentType: 'application/javascript; charset=utf-8',
    encoding: 'utf8',
    body: readText('web_assets/points-records.js'),
  },
  '/assets/app/student-trend.js': {
    contentType: 'application/javascript; charset=utf-8',
    encoding: 'utf8',
    body: readText('web_assets/student-trend.js'),
  },
  '/assets/app/base.js': {
    contentType: 'application/javascript; charset=utf-8',
    encoding: 'utf8',
    body: readText('web_assets/base.js'),
  },
  '/assets/app/base.css': {
    contentType: 'text/css; charset=utf-8',
    encoding: 'utf8',
    body: readText('web_assets/base.css'),
  },
  '/assets/app/index.css': {
    contentType: 'text/css; charset=utf-8',
    encoding: 'utf8',
    body: readText('web_assets/index.css'),
  },
  '/assets/app/add-group.js': {
    contentType: 'application/javascript; charset=utf-8',
    encoding: 'utf8',
    body: readText('web_assets/add-group.js'),
  },
  '/assets/app/edit-group.js': {
    contentType: 'application/javascript; charset=utf-8',
    encoding: 'utf8',
    body: readText('web_assets/edit-group.js'),
  },
}

const lines = [
  'export type StaticAsset = {',
  '  contentType: string',
  "  encoding: 'utf8' | 'base64'",
  '  body: string',
  '}',
  '',
  'export const staticAssets: Record<string, StaticAsset> = {',
]

for (const [assetPath, asset] of Object.entries(assets)) {
  lines.push(`  ${JSON.stringify(assetPath)}: {`)
  lines.push(`    contentType: ${JSON.stringify(asset.contentType)},`)
  lines.push(`    encoding: ${JSON.stringify(asset.encoding)},`)
  lines.push(`    body: ${JSON.stringify(asset.body)},`)
  lines.push('  },')
}

lines.push('}')
lines.push('')

fs.writeFileSync(outputPath, `${lines.join('\n')}\n`)
console.log(`Generated static assets -> ${outputPath}`)
