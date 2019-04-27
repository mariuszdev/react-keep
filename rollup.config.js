import babel from "rollup-plugin-babel";
import minify from "rollup-plugin-babel-minify";

const plugins = () => [babel(), minify()];

const external = ["react"];

export default [
  {
    input: "src/withKeep.js",
    output: {
      name: "withKeep",
      file: "dist/index.esm.js",
      format: "esm"
    },
    external,
    plugins: plugins()
  },
  {
    input: "src/withKeep.js",
    output: {
      name: "withKeep",
      file: "dist/index.js",
      format: "cjs"
    },
    external,
    plugins: plugins()
  }
];
