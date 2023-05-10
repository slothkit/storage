import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const resolve = (relativePath) => path.resolve(__dirname, '..', relativePath)

export default {
  root: resolve('.'),
  packageDir: resolve('.'),
  packageJson: resolve('package.json'),
  src: resolve('src'),
  tsconfig: resolve('tsconfig.json'),
  node_modules: resolve('node_modules'),
  distDir: resolve('dist'),
}
