import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'fs-extra'
import chalk from 'chalk'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import nodeResolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import typescript from '@rollup/plugin-typescript'
import paths from './paths.js'

const require = createRequire(import.meta.url)
const __dirname = fileURLToPath(new URL('.', import.meta.url))
const resolve = (relativePath) => path.resolve(__dirname, '..', relativePath)

const { packageDir, distDir } = paths
const pkg = fs.readJsonSync(paths.packageJson)

const extensions = ['.js', 'jsx', '.ts', '.tsx', '.json']

const outputConfigs = {
  cjs: {
    file: path.resolve(`${packageDir}/${pkg.main}`),
    format: 'cjs',
  },
  esm: {
    file: path.resolve(`${packageDir}/${pkg.module}`),
    format: 'esm',
  },
  global: {
    file: path.resolve(`${distDir}/storage.min.js`),
    format: 'iife',
    name: 'Storage',
  }
}

export function createConfig(format, output, plugins = []) {
  if (!output) {
    console.log(chalk.yellow('invalid output: no output'))
    process.exit(1)
  }

  let external = []
  const isGlobalBuild = /global/.test(format)
  let useCompress = false
  let useSourceMap = true
  let useBabel = false
  if (isGlobalBuild) {
    useCompress = true
    useSourceMap = false
    useBabel = true
  } else {
    external = [
      ...Object.keys(pkg.peerDependencies || {})
    ]
  }

  output.sourcemap = useSourceMap

  /**
   * @type {import('rollup').RollupOptions}
   */
  const config = {
    input: resolve('src/index.ts'),
    output,
    plugins: [
      commonjs(),
      nodeResolve({ browser: true }),
      json({ namedExports: false }),
      typescript({
        tsconfig: paths.tsconfig,
        declaration: !!isGlobalBuild,
        declarationDir: path.resolve(`${packageDir}/types`),
      }),
      replace({
        preventAssignment: true,
        exclude: 'node_modules/**',
        __VERSION__: JSON.stringify(pkg.version),
      }),
      ...plugins,
    ],
  }
  return config
}

const formats = ['cjs', 'esm', 'global']
const configs = formats.map((format) => createConfig(format, outputConfigs[format]))

export default configs
