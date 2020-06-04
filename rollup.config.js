import json from 'rollup-plugin-json';
import { terser } from 'rollup-plugin-terser'
import babel from "rollup-plugin-babel";
import buble from '@rollup/plugin-buble';

export default {
    input: './src/index.js',
    output: {
        name: 'BMapLoader',
        file: 'dist/index.js',
        format: 'umd'
    },
    plugins: [babel({
        presets: [["@babel/env", { targets: { ie: 9 } }]]
    }), json(), buble(),terser()]
}