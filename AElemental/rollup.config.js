import {nodeResolve} from '@rollup/plugin-node-resolve';
import css from "rollup-plugin-import-css";

export default {
    input: 'main.js',
    output: { file: "./wwwroot/aelemental.js", format: "esm" },
    plugins: [nodeResolve(), css()]
};