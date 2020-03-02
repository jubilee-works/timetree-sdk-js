import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import replace from "@rollup/plugin-replace";

const isBrowser = process.env.TARGET === "browser";
const fileName = isBrowser ? "browser" : "index";
export default {
  input: "./src/index.ts",
  output: [
    {
      file: `./dist/${fileName}.js`,
      format: "cjs"
    },
    {
      file: `./dist/${fileName}.mjs`,
      format: "esm"
    }
  ],
  plugins: [
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          module: "es2015",
          moduleResolution: "node"
        }
      }
    }),
    json(),
    resolve({
      browser: isBrowser,
      preferBuiltins: true
    }),
    commonjs(),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    terser()
  ]
};
