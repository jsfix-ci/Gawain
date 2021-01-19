const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: { lessOptions: { javascriptEnabled: true } },
          },
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: path.resolve("./src/index.html") }),
  ],

  optimization: {
    runtimeChunk: {
      name: "runtime~main",
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "common~main",
          chunks: "initial",
          minSize: 30,
          enforce: true,
          priority: -20,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors~main",
          chunks: "initial",
          priority: -10,
        },
      },
    },
  },
};
