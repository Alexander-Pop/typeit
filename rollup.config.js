const pkg = require("./package.json");
import path from "path";
import babel from "rollup-plugin-babel";
import minify from "rollup-plugin-babel-minify";

const isModern = process.env.BROWSER_TYPE === "modern";

const banner = `/**
  *
  * TypeIt - ${pkg.description}
  * Author: ${pkg.author}
  * Version: v${pkg.version}
  * License: ${pkg.license}
  * URL: ${pkg.homepage}
  *
  */`;

const browsers = {
  default: ["> 2%", "Last 2 versions", "safari >=9", "not ie < 11"],
  modern: [
    "Edge >= 16",
    "Firefox >= 60",
    "Chrome >= 61",
    "Safari >= 11",
    "Opera >= 48"
  ]
};

export default {
  input: "./src/TypeIt.js",
  output: {
    file: `rollup.${isModern ? "modern." : ""}min.js`,
    format: "umd",
    name: "TypeIt"
  },
  plugins: [
    babel({
      configFile: path.resolve(__dirname, "babel.config.js"),
      exclude: "node_modules/*"
    }),
    minify({
      comments: false,
      bannerNewLine: true,
      banner
    })
  ]
};
