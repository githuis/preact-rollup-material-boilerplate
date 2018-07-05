'use strict';

import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import buble from 'rollup-plugin-buble'
import { uglify } from 'rollup-plugin-uglify';
import html from 'rollup-plugin-fill-html';

import cssnano from 'cssnano';
import nested   from 'postcss-nested';
import presetEnv  from 'postcss-preset-env';


export default {
    input: 'src/index.js',
    output: {
        file: 'dist/bundle.js',
        format: 'iife',
        sourcemap: true
    },
    plugins: [
        postcss({
            autoModules: true,
            plugins: [
                nested(),
                presetEnv(),
                cssnano({ preset: 'default' })
            ]
        }),
        resolve({
            jsnext: true,
            main: true,
            browser: true
        }),
        buble({
            jsx: 'h',
            objectAssign: 'Object.assign'
        }),
        commonjs(),
        uglify(),
        html({
            template: 'src/index.html',
            filename: 'index.html'
        })
    ]
}