import * as path from 'path'
import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'
import pkg from './package.json'

const PRODUCTION = process.env.BUILD === 'production'
const dir = PRODUCTION ? 'dist' : 'build'
const pkgFile = moduleType => path.join(dir, path.basename(pkg[moduleType]))
const globals = {
  'react': 'React',
  'react-dom': 'ReactDOM',
}

export default {
  input: './src/index.ts',
  external: ['react', 'react-dom'],
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      declaration: true,
    }),
    (PRODUCTION && uglify()),
  ],
  output: [
    { globals, file: pkgFile('browser'), format: 'umd', name: 'starfield' },
    { globals, file: pkgFile('main'), format: 'cjs' },
    { globals, file: pkgFile('module'), format: 'es' }
  ]
}
