import { resolve as _resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'fs-extra'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import nodeResolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import typescript from '@rollup/plugin-typescript'
import { babel } from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'
import babelConfig from '../babel.config.js'
const { readJsonSync } = fs

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const resolve = (p) => _resolve(__dirname, '..', p)

const extensions = ['.js', '.jsx', '.ts', '.tsx']

const pkgJson = readJsonSync(resolve('package.json'))
const { version } = pkgJson

const outputs = [
  {
    file: resolve(pkgJson.module),
    format: 'esm',
    sourcemap: false,
  },
  {
    format: 'iife',
    name: 'Storage',
    file: resolve('dist/storage.min.js'),      
  }
]

function createConfig(output) {
  let isCompress = false
  if (output.format === 'iife') {
    isCompress = true
  }
  return {
    input: resolve('src/index.ts'),
    output,
    plugins: [
      commonjs(),
      nodeResolve({ browser: true }),
      json({ namedExports: false }),
      typescript({
        tsconfig: resolve('tsconfig.json'),
        compilerOptions: {
          declaration: true,
          declarationDir: 'types',
          sourceMap: false,
        },
      }),
      replace({
        preventAssignment: true,
        exclude: 'node_modules/**',
        __VERSION__: JSON.stringify(version),
      }),
      isCompress && babel({
        extensions,
        babelHelpers: 'bundled',
        ...babelConfig,
      }),
      isCompress && terser({
        format: {
          comments: false,
        },
      }),
    ]
  }
}

const config = outputs.map(createConfig)

export default config
