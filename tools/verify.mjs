import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, extname, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const read = (path) => readFileSync(resolve(root, path), 'utf8')

function run(command, args, cwd = root) {
  const result = spawnSync(command, args, { cwd, stdio: 'inherit' })
  if (result.error) throw result.error
  if (result.status !== 0) process.exit(result.status ?? 1)
}

run(process.execPath, ['--test', 'tools/content-details.test.mjs'])
run(process.execPath, ['--test', 'tools/agent-actions.test.mjs'])
run(process.execPath, ['--test', 'tools/agent-stream.test.mjs'])
run(process.execPath, ['--test', 'tools/agent-text-queue.test.mjs'])
run(process.execPath, ['tools/agent-catalog.mjs'])
run(process.env.PYTHON ?? 'python', ['-m', 'unittest', 'discover', '-s', 'Dream-Back-To-Song_backend/agent', '-p', 'test_*.py'])

const config = JSON.parse(read('src/pages.json'))
const routes = [
  ...config.pages.map(({ path }) => path),
  ...(config.subPackages ?? []).flatMap(({ root, pages }) =>
    pages.map(({ path }) => `${root}/${path}`)),
]
const routeSet = new Set(routes)
assert.equal(routeSet.size, routes.length, '页面路由重复')
for (const route of routes) {
  assert.ok(existsSync(resolve(root, `src/${route}.vue`)), `页面缺失：${route}`)
}

function filesIn(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name)
    return entry.isDirectory() ? filesIn(path) : [path]
  })
}

for (const file of filesIn(resolve(root, 'src'))) {
  if (!['.vue', '.js', '.ts', '.css', '.scss', '.sass', '.less'].includes(extname(file))) continue
  const source = readFileSync(file, 'utf8').replace(/^\s*\/\/.*$/gm, '')
  assert.doesNotMatch(source, /url\(\s*['"]?\s*@https?:\/\//i,
    `${file} 的 CSS url() 包含错误的 @http(s):// 地址`)
  for (const [, specifier] of source.matchAll(/(?:\bfrom\s*|\bimport\s*(?:\(\s*)?)['"]((?:@\/|\.\.?\/)[^'"]+)['"]/g)) {
    const target = specifier.startsWith('@/')
      ? resolve(root, 'src', specifier.slice(2))
      : resolve(dirname(file), specifier)
    assert.ok(['', '.js', '.vue', '.ts', '/index.js'].some((suffix) => existsSync(target + suffix)),
      `${file} 引用了缺失模块：${specifier}`)
  }
}
console.log(`结构检查通过：${routes.length} 个页面及本地模块引用`)

for (const script of ['build:mp-weixin', 'build:h5']) {
  run(process.execPath, [process.env.npm_execpath, 'run', script])
}
const backend = resolve(root, 'Dream-Back-To-Song_backend')
if (process.platform === 'win32') {
  run(process.env.ComSpec ?? 'cmd.exe', ['/d', '/s', '/c', 'mvnw.cmd test'], backend)
} else {
  run('sh', ['./mvnw', 'test'], backend)
}
console.log('统一验证通过')
