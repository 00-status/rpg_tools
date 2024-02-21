const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "bundle.js"
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: { filename: "fonts/[hash][ext][query]" }
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: "asset/resource",
        generator: { filename: "images/[hash][ext][query]" }
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: [/(node_modules)/],
        loader: "babel-loader",
        options: { presets:
          [
            "@babel/env",
            [ '@babel/preset-react', { runtime: 'automatic' }],
            "@babel/preset-typescript"
          ]
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx", ".ts", ".tsx"] }
};
