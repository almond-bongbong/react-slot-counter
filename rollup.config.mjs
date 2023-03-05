import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

import packageJson from './package.json' assert { type: 'json' };

const extensions = ['js', 'jsx', 'ts', 'tsx', 'mjs'];

export default {
  input: './src/index.tsx',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    nodeResolve({ extensions }),
    commonjs(),
    typescript({
      clean: true,
      tsconfig: './tsconfig.json',
      useTsconfigDeclarationDir: true,
    }),
    postcss({
      extract: false,
      modules: true,
      sourceMap: false,
      use: ['sass']
    })
  ],
};
