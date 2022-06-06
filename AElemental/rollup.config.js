import {nodeResolve} from '@rollup/plugin-node-resolve';
// import scss from "rollup-plugin-scss";
import typescript from '@rollup/plugin-typescript';

export default {
    input: 'main.ts',
    output: { file: "./wwwroot/aelemental.js", format: "esm" },
    plugins: [
        typescript(),
        nodeResolve(), 
        // scss({
        //     output: "./wwwroot/aelemental.css",
        //     outputStyle: "compressed"
        // })
    ]
};