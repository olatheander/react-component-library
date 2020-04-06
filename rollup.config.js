import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import resolve from "rollup-plugin-node-resolve";
import babel from 'rollup-plugin-babel';

export default {
  input: "src/index.js",
  output: [
    {
        dir: 'public/dist/cjs',
        format: "cjs",
        sourcemap: true
    },
    {
        dir: 'public/dist/es',
        format: "es",
        sourcemap: true
    }
  ],
  plugins: [
    external(),
    resolve({
      browser: true
    }),
    babel({ 
        exclude: 'node_modules/**',
        presets: ['@babel/env', '@babel/preset-react']
    }),
    commonjs({
      include: ["node_modules/**"],
      exclude: ["**/*.stories.js"],
      namedExports: {
        "node_modules/react/react.js": [
          "Children",
          "Component",
          "PropTypes",
          "createElement"
        ],
        "node_modules/react-dom/index.js": ["render"]
      }
    })
  ]
};