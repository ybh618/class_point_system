const { readdirSync, readFileSync, writeFileSync } = require('node:fs')
const { join } = require('node:path')
const nunjucks = require('nunjucks')

const root = process.cwd()
const sourceDir = join(root, 'templates')
const outFile = join(root, 'src', 'templates.generated.ts')

const entries = readdirSync(sourceDir).filter((file) => file.endsWith('.html'))
const parts = ['// @ts-nocheck', 'export const precompiledTemplates: Record<string, unknown> = {}']
for (const file of entries) {
  const content = readFileSync(join(sourceDir, file), 'utf-8')
  const compiled = nunjucks.precompileString(content, { name: file })
  const prefix = `(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["${file}"] = `
  let inner = compiled.replace(prefix, '')
  inner = inner.replace(/\}\)\(\);\n\}\)\(\);\n?$/, '')
  inner = inner.trimEnd()
  parts.push(`precompiledTemplates["${file}"] = ${inner}\n})();`)
}
parts.push('')
writeFileSync(outFile, parts.join('\n'), 'utf-8')
console.log(`Generated ${entries.length} templates -> ${outFile}`)
