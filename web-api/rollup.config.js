import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "./src/index.ts",
  output: [
    {
      file: "./dist/index.js",
      format: "cjs"
    },
    {
      file: "./dist/index.mjs",
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
    resolve({
      resolveOnly: [/src\/.*$/, "ky-universal"]
    }),
    commonjs(),
    terser()
  ]
};
