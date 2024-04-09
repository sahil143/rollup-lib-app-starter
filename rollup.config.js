import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";

export default {
  input: "./src/index.ts",
  output: [
    {
      file: "dist/cjs/index.js",
      format: "cjs",
      sourcemap: true,
      inlineDynamicImports: true,
    },
    {
      file: "dist/esm/index.js",
      format: "esm",
      sourcemap: true,
      inlineDynamicImports: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    nodeResolve(),
    commonjs({
      define: {
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      },
    }),
    typescript({
      tsconfig: "./tsconfig.json",
      exclude: [
        "**/__tests__/**/*",
        "**/*.spec.(ts|tsx)",
        "**/stories/**/*",
        "**/*.stories.(ts|tsx)",
      ],
    }),
    terser(),
  ],
};
